import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: User | null;
  loginGoogle: (googleToken: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isAuthenticating : true,
  user: null,
  loginGoogle: async () => {},
  logout: () => {},
  checkAuth: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const checkAuth = async () => {
    setIsAuthenticating(true); // 1) start loading
    try {
      console.log("Trying to check auth...");
  
      let res = await fetch("http://localhost:8080/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setUser({ email: data.user.email, name: data.user.name });
      } else if (res.status === 401) {
        // attempt refresh
        const refreshRes = await fetch("http://localhost:8080/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (refreshRes.ok) {
          // try /auth/me again
          res = await fetch("http://localhost:8080/auth/me", { credentials: "include" });
          if (res.ok) {
            const data = await res.json();
            setIsAuthenticated(true);
            setUser({ email: data.user.email, name: data.user.name });
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("checkAuth error:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
		setIsAuthenticating(false); // 2) done loading
    }
  };
  

  const loginGoogle = async (token: string) => {
    try {
        console.log("Trying to login with Google...");
      const res = await fetch("http://localhost:8080/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        setUser({ email: data.user.email, name: data.user.name });
        console.log("Google login successful:", data.user.email);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        console.error("Google login failed:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("loginGoogle error:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextProps = {
    isAuthenticated,
    isAuthenticating,
    user,
    loginGoogle,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
