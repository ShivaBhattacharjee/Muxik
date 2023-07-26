import React, { createContext, useState, useContext } from 'react';
import BackEndService from '../services/BackEndService'; // Update the path to your axios instance

const RegisterContext = createContext();

export function useRegisterContext() {
  return useContext(RegisterContext);
}

export function RegisterProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [error , setError] = useState(null)
  const [errorVerify , setErrorVerify] = useState(null)
  const registerUser = async (userData) => {
    try {
      const response = await BackEndService.post('/register', userData);
      const user = response.data;
      setUserDetails(user);
      console.log('User registered:', user);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error registering user:', error?.response?.data?.message);
      setError(error?.response?.data?.message || 'An error occurred during registration try again later');
    }
  }
  const verifyUser = async (email, verificationCode) => {
    try {
      const queryParam = `?email=${email}&verificationCode=${verificationCode}`;
      const response = await BackEndService.post('/verify-register' + queryParam);
      console.log('Verification response:', response.data);
  
      if (response.data && response.data.isVerified) {
        console.log('User verified successfully');
        setUserDetails((prevUser) => ({
          ...prevUser,
          isVerified: true,
        }));
        setErrorVerify(null)
      } else {
        console.log('User verification failed');
        setErrorVerify("User verification failed")
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      setErrorVerify(error?.data?.message || 'An error occurred during verifying user');
    }
  };
  


  return (
    <RegisterContext.Provider value={{ userDetails, registerUser, verifyUser, error, errorVerify }}>
      {children}
    </RegisterContext.Provider>
  );
}

