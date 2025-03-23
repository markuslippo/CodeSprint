import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  loginWithGoogle: (googleToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading : true,
  user: null,
  loginWithGoogle: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	
	useEffect(() => {
		checkAuth();
	  }, []);

	//Ping /auth/me to check authentication status.
	const checkAuth = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await api.get("/auth/me");
			setAuthenticatedUser(response.data.user);
		} catch (error) {
			console.log("User not authenticated");
			setNotAuthenticated();
		} finally {
			setIsLoading(false);
		}
	};

	const setAuthenticatedUser = (user: User) => {
		setUser(user);
		setIsAuthenticated(true);
		console.log("Logged in as:", user);
	}

	const setNotAuthenticated = () => {
		setIsAuthenticated(false);
		setUser(null);
	}

	// Send token to server to authenticate via Google. If successful, set user and isAuthenticated to true.
	const loginWithGoogle = async (token: string) => {
		setIsLoading(true);
		try {
			const response = await api.post("/auth/google", { token });
			setAuthenticatedUser(response.data.user);
		} catch(error) {
			console.log("Error with Google login:", error);
			setNotAuthenticated();
		} finally {
			setIsLoading(false);
		}
	};

	// Remove cookies and user.
	const logout = async () => {
		setIsLoading(true);
		console.log("Logout started.");
		try {
			console.log("Logging out.");
			await api.get("/auth/logout");
			setNotAuthenticated();
		} catch {
			console.log("Failed to logout.");
			setNotAuthenticated();
		} finally {
			console.log("Logout finished");
			setIsLoading(false);
		}
		
	};

	const value: AuthContextProps = { isAuthenticated, isLoading, user, loginWithGoogle, logout, };

	if(isLoading) return null;

  	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
