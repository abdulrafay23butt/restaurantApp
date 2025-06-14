import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    const fetchUserData = async () => {
      if (!storedToken) return;

      try {
        const response = await fetch('http://localhost:3001/api/verifyToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: storedToken }),
        });

        const data = await response.json();

        console.log('Data from API:', response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('API Error:', error);
        if (error.response && error.response.status === 401) {
          logout();
          setTimeout(() => {
            <Navigate to="/admin" replace />;
          }, 0);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUserData(null);
    setIsLoggedIn(false);
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider
      value={{ userData, login, logout, isAuthenticated, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
