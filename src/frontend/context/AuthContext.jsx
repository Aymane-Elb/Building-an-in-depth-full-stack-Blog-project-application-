// src/frontend/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Will store user object { _id, username, email, role, token }
  const [loading, setLoading] = useState(true); // To handle initial loading of token from localStorage

  useEffect(() => {
    // Check localStorage for user data on initial load
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('userToken');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Basic check for token validity (optional, a more robust check involves token expiry)
        // For simplicity, we just check if it exists for now
        setUser({ ...parsedUser, token: storedToken });
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
      }
    }
    setLoading(false);
  }, []);

  // Function to log in a user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userToken', userData.token);
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};