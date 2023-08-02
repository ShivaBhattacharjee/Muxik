import React, { useState } from 'react'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Link } from 'react-router-dom';
import { useForgotPasswordContext } from '../Context/ResetPasswordContext';
import { ErrorNotify, SuccessNotify } from '../Utils/toast';
import ClipLoader from "react-spinners/ClipLoader";
const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [otp , setOtp] = useState()
  const { forgotPassword, error, emailSentTo, verifyForgotPassword,setError } = useForgotPasswordContext()
  const [loading, setLoading] = useState(false)
  const [verifyLoading , setVerifyLoading] = useState(false)
  const handleGetForgotPasswordOtp = async (e) => {
    e.preventDefault();
    setLoading(true)
    const userData = {
      email: email,
    };
    try {
      await forgotPassword(userData);
      setLoading(false)
    } catch (error) {
      console.error(error || "Can't send otp");
      setLoading(false)
    }
  };
  const handleResetPassowrd = async(e)=>{
    e.preventDefault()
    setVerifyLoading(true)
    const newPassData = {
      email : email,
      otp : otp,
      newPassword : newPassword
    }
    try{
      await verifyForgotPassword(newPassData)
      setVerifyLoading(false)
    }catch(error){
      setVerifyLoading(false)
      setError("Unable to change  password try again later")
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 flex justify-center items-center bg-[#2d1b69] h-screen">
      {emailSentTo && <SuccessNotify message={"Reset email sent please enter the otp"} />}
      {error && <ErrorNotify message={"Error sending verification mail"} />}
      <form autoComplete='false' className="max-w-sm rounded-2xl text-[#1A2421] lg:backdrop-blur-lg  p-8 md:p-10 lg:p-10 bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-2xl -translate-y-10">
        <h3 className="mb text-xl text-[#1A2421] font-semibold">Forgot Password</h3>
        <p className="mb-6 mt-3 text-sm text-[#1A2421]/90 text-opacity-50">Keep something secure and memorable, to avoid the pain of forgetting your password.</p>

        <label htmlFor="username" className="relative block mb-4 text-black/50 focus-within:text-black">
          <AlternateEmailIcon className='transition pointer-events-none w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2' />
          <input
            className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50 transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 bg-black/20 focus:bg-black/25 text-[#333] focus:text-gray-900"
            type="text"
            name="username"
            autoComplete='false'
            placeholder="Username"
            required
            onChange={(e) => setEmail(e.target.value)}
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
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>

        <label htmlFor="password" className="form-label relative text-black/50 focus-within:text-black block mb-4">
          <div className="flex justify-between">
            <VpnKeyIcon className='pointer-events-none w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2' />
            <input type="number" placeholder='otp'
              className="block w-[60%] rounded-lg leading-none focus:outline-none placeholder-black/50 transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 bg-black/20 focus:bg-black/25 text-[#333] focus:text-gray-900"
              required onChange={(e)=> setOtp(e.target.value)} />
            <button
              className="bg-blue-800 hover:bg-blue-700 duration-100 p-2 w-24 text-white rounded-lg"
              onClick={handleGetForgotPasswordOtp}
              disabled={!email || !newPassword}
            >
              {loading ? <ClipLoader size={30} color="#fff" speedMultiplier={3} /> : "Get OTP"}
            </button>
          </div>
        </label>

        <button
          className="form-input w-full rounded-lg font-bold text-white focus:outline-none p-3 md:p-4 lg:p-4 transition-colors duration-500 bg-blue-800 hover:bg-blue-700"
          onClick={handleResetPassowrd}
          disabled={!email || !newPassword || !otp}
        >
          {verifyLoading ?<ClipLoader size={30} color="#fff" speedMultiplier={3} /> : "Continue" }
        </button>

        <div className="form-footer mt-6 text-center">
          <Link to="/login">
            <p className='text-sm font-semibold text-white'>Login</p>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword