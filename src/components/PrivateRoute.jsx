import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
// cheking if user is not login then redirect to login page 
  return  authState.isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;