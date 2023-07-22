// LoginContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import BackEndService from '../services/BackEndService';
import Cookies from 'js-cookie';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await BackEndService.post('/login', {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        setLoggedIn(true);
        setError('');
        setToken(response.data.token);
        setUsername(username);
        const expiration = 7; // Set the cookie expiration in days
        Cookies.set('token', response.data.token, { expires: expiration });
        Cookies.set('username', username, { expires: expiration }); // Store the username in a cookie
      } else {
        throw new Error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Reset krle ya account bna le bsdk');
      console.error(error);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setToken(null);
    setUsername(null);
    Cookies.remove('token');
    Cookies.remove('username'); // Remove the username cookie on logout
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
    const storedUsername = Cookies.get('username'); // Get the username from the cookie
    if (storedUsername) {
      setUsername(storedUsername); // Set the username from the cookie
    }
  }, []);

  const contextValue = {
    loggedIn,
    error,
    login,
    logout,
    token,
    username,
    axiosInstance: BackEndService,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};
