// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('TokenAccess');
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
