import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../hooks/Store/useStore";

const RequireAuth = ({ children }) => {
  const auth = useStore((state) => state.user);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
