import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    //return <Navigate to="/login" replace/>;
    return <p>Login form comes here</p>;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
