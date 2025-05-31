import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;