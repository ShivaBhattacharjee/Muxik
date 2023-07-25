import React, { createContext, useState, useContext } from 'react';
import BackEndService from '../services/BackEndService'; // Update the path to your axios instance

const RegisterContext = createContext();

export function useRegisterContext() {
  return useContext(RegisterContext);
}

export function RegisterProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
  
    const registerUser = async (userData) => {
      try {
        const response = await BackEndService.post('/register', userData);
        const user = response.data;
        setUserDetails(user);
        console.log('User registered:', user); 
      } catch (error) {
        console.error('Error registering user:', error);
      }
    };
  
    const verifyUser = async (email, verificationCode) => {
      try {
        const queryParam = `?email=${email}&verification_code=${verificationCode}`;
        const response = await BackEndService.post('/verify-register' + queryParam);
    
        if (response.data && response.data.isVerified) {
          setUserDetails((prevUser) => ({
            ...prevUser,
            isVerified: true,
          }));
          console.log('User verified successfully');
        } else {
          console.log('User verification failed');
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        if (error.response) {
          console.log('Error response data:', error.response.data);
        }
      }
    };
    
  
    return (
      <RegisterContext.Provider value={{ userDetails, registerUser, verifyUser }}>
        {children}
      </RegisterContext.Provider>
    );
  }
  
