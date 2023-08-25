import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();

  return auth?.token ? children : <Navigate to={"/login"} />;
};

export default ProtectRoute;
