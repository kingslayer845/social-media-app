import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("jwt");
  return token ? children : <Navigate to={"/login"} />;
};

export default ProtectRoute;
