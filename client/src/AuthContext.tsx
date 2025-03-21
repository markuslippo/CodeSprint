import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  checkAuth: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/me", {
        credentials: "include",
      });

      if (!res.ok) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const data = await res.json();
      setIsAuthenticated(true);
      setUser({ email: data.email, name: data.name });
    } catch (error) {
      console.error("checkAuth error:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = async (googleToken: string) => {

  };

  // 3) logout function: calls backend /logout => clears cookies => set local state
  const logout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setUser(null);
  };

  // 4) On app mount, check if user is logged in (cookies might still be valid)
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextProps = {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
