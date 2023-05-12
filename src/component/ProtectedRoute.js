import React from 'react';
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ authenticated, children }) => {
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
  
export default ProtectedRoute;