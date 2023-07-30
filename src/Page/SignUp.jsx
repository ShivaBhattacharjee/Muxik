import React, { useEffect, useState } from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterContext } from '../Context/RegisterContext';
import { useLoginContext } from '../Context/LoginContext';
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorNotify, SuccessNotify } from '../Utils/toast';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { registerUser, verifyUser, userDetails, error, emailSentTo, verifyLoading, resendVerificationOTP } = useRegisterContext();
  const [verificationCode, setVerificationCode] = useState("");
  const { loggedIn, login } = useLoginContext();
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [getOTPLoading, setGetOTPLoading] = useState(false); 
  const [resendOTPLoading, setResendOTPLoading] = useState(false); 

  const handleGetOtp = async (e) => {
    e.preventDefault();
    setGetOTPLoading(true); 
    const userData = {
      username: username,
      password: password,
      email: email,
      profile: 'https://cdn.discordapp.com/attachments/1079039236302446705/1135194990935552110/images.jpeg',
    };
    try {
      await registerUser(userData);
      localStorage.setItem('tempUsername', username);
      localStorage.setItem('tempPassword', password);
      localStorage.setItem('email', email);
      setOtpSent(true);
      setCooldown(true);
      setRemainingTime(30);
      startCountdownTimer();
    } catch (error) {
      console.error('Error registering user:', error?.response?.data?.message);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setGetOTPLoading(false); 
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await verifyUser(email, verificationCode);
      await login(username, password);
      localStorage.removeItem('tempUsername');
      localStorage.removeItem('tempPassword');
      localStorage.removeItem("email");
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    try {
      const userEmail = localStorage.getItem('email');
      if (userEmail) {
        setResendOTPLoading(true); 
        setOtpSent(false);
        await resendVerificationOTP(userEmail);
        setCooldown(true);
        setRemainingTime(30);
        startCountdownTimer();
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      showErrorToast('Failed to resend OTP. Please try again later.');
    } finally {
      setResendOTPLoading(false); // Set the loading state for "Resend OTP" button to false after resending the OTP
    }
  };

  const startCountdownTimer = () => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setCooldown(false);
    }, 30 * 1000);
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }

    const storedUsername = localStorage.getItem('tempUsername');
    const storedPassword = localStorage.getItem('tempPassword');
    const storedEmail = localStorage.getItem('email');
    if (storedUsername && storedPassword && storedEmail) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setEmail(storedEmail);
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 flex justify-center items-center bg-[#2d1b69] h-screen">
        <form autoComplete='false' className="max-w-sm rounded-2xl text-[#1A2421] lg:backdrop-blur-lg  p-8 md:p-10 lg:p-10 bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-2xl -translate-y-10">
          {userDetails?.isVerified && (
            <ErrorNotify message={"You are already registered and verified. Please log in."} />
          )}

          {emailSentTo && (
            <SuccessNotify message={"OTP sent to the email address. Please check your email."} />
          )}

          {error && (
            <ErrorNotify message={error} />
          )}

          <h3 className="mb text-xl text-[#1A2421] font-semibold">Register</h3>
          <p className="mb-6 text-sm text-[#1A2421]/90 text-opacity-50">Let's embark on a musical journey together by registering with us!</p>

          <label htmlFor="username" className="relative block mb-4 text-black/50 focus-within:text-black">
            <AlternateEmailIcon className='transition pointer-events-none w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2' />
            <input
              className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50 transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 bg-black/20 focus:bg-black/25 text-[#333] focus:text-gray-900"
              type="text"
              name="username"
              autoComplete='false'
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label htmlFor="username" className="relative block mb-4 text-black/50 focus-within:text-black">
            <AlternateEmailIcon className='transition pointer-events-none w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2' />
            <input
              className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50 transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 bg-black/20 focus:bg-black/25 text-[#333] focus:text-gray-900"
              type="email"
              name="email"
              autoComplete='false'
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label htmlFor="password" className="form-label relative text-black/50 focus-within:text-black block mb-4">
            <VpnKeyIcon className='pointer-events-none w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2' />
            <input
              className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50 transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 bg-black/20 focus:bg-black/25 text-[#333] focus:text-gray-900"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete='false'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label htmlFor="password" className="form-label relative text-black/50 focus-within:text-black block mb-4">
            <div className="flex justify-between">
              <VpnKeyIcon className='pointer-events-none w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2' />
              <input type="number" placeholder='otp'
                className="block w-[60%] rounded-lg leading-none focus:outline-none placeholder-black/50 transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 bg-black/20 focus:bg-black/25 text-[#333] focus:text-gray-900" onChange={(e) => setVerificationCode(e.target.value)}
                required />
              <button
                className={`bg-blue-800 hover:bg-blue-700 duration-100 p-2 w-24 text-white rounded-lg ${
                  otpSent && cooldown ? "pointer-events-none" : ""
                }`}
                onClick={otpSent ? handleResendOTP : handleGetOtp}
                disabled={!username || !email || cooldown || getOTPLoading}
              >
                {getOTPLoading ? (
                  <ClipLoader size={20} color="#fff" speedMultiplier={3} />
                ) : otpSent ? (
                  cooldown ? `${remainingTime}s` : (resendOTPLoading ? 'Resending...' : 'Resend')
                ) : (
                  'Get OTP'
                )}
              </button>
            </div>
          </label>

          <button
            className="form-input w-full rounded-lg font-bold text-white focus:outline-none p-3 md:p-4 lg:p-4 transition-colors duration-500 bg-blue-800 hover:bg-blue-700"
            onClick={handleSignUp}
            disabled={!username || !email || !verificationCode || verifyLoading}
          >
            {verifyLoading ? <ClipLoader size={30} color="#fff" speedMultiplier={3} /> : 'Continue'}
          </button>

          <div className="form-footer mt-6 text-center">
            <Link to="/login">
              <p className='text-sm font-semibold text-white'>Login</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignUp;
