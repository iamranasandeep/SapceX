import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userName = import.meta.env.VITE_USER_NAME;
  const password = import.meta.env.VITE_PASSWORD;
  // buy default taking authstate logout 
  const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });
  const navigate = useNavigate();

  const login = (user) => {
    console.log('user',user)
    console.log('username',userName)
    console.log('password',password)
    // Example authentication check (replace with actual authentication logic)
    if (user.email === userName && user.password === password) {
      setAuthState({ isAuthenticated: true, user });
      navigate('/home');; // Redirect to home page on successful login
    } else {
      setAuthState({ isAuthenticated: false, user: null });
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  const signup = (user) => {
    setAuthState({ isAuthenticated: true, user });
    navigate('/home');; // Redirect to home page on successful signup
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
