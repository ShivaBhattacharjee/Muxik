import React, { createContext, useState, useContext } from 'react';
import BackEndService from '../services/BackEndService';

const RegisterContext = createContext();

export function useRegisterContext() {
  return useContext(RegisterContext);
}

export function RegisterProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null); 
  const [emailSentTo, setEmailSentTo] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const registerUser = async (userData) => {
    try {
      const response = await BackEndService.post('/register', userData);
      const user = response.data;
      setUserDetails(user);
      console.log('User registered:', user);
      setEmailSentTo(user?.otpStatus)
      console.log(user?.otpStatus)
      setError(null); 
    } catch (error) {
      console.error('Error registering user:', error?.response?.data?.message);
      setError(error?.response?.data?.message || 'An error occurred during registration. Please try again later.');

    }
  };

  const verifyUser = async (email, verificationCode) => {
    setVerifyLoading(true); 
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
      } else {
        console.log('User verification failed');
        setError("User verification failed");
      }
    } catch (error) {
      console.error('Error verifying user:', error.response);
      setError(error?.data?.message || 'An error occurred during verifying user.');
    } finally {
      setVerifyLoading(false); 
    }
  };

  const resendVerificationOTP = async (email) => {
    try {
      const queryParam = `?email=${email}`;
      const response = await BackEndService.post('/resend-email' + queryParam);
      console.log('Resend OTP response:', response.data);
      setEmailSentTo("Resend email sent successfully");
    } catch (error) {
      console.error('Error resending verification OTP:', error);
      setError(error?.response?.data?.message || 'An error occurred during OTP resend.');
    }
  };
  
  return (
    <RegisterContext.Provider
      value={{ userDetails, registerUser, verifyUser,resendVerificationOTP, error,  emailSentTo, verifyLoading,setError }} 
    >
      {children}
    </RegisterContext.Provider>
  );
}
