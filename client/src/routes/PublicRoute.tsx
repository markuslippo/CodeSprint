import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isAuthenticating } = useAuth();
  
  if (isAuthenticating) {
      return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
