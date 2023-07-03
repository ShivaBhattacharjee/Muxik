import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const Login = () => {
  return (
    <section className='flex items-center justify-center min-h-screen overflow-hidden bg-[#2d1b69] '>
      <div className="relative flex flex-col m-6 space-y-8 backdrop-blur-2xl bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
      <div className="flex flex-col justify-center p-8 md:p-14">
        <span className='mb-3 text-4xl font-bold'>Welcome back 👋 </span>
        <span className='font-light text-gray-400 mb-8'>
          Please enter your details to login
        </span>
        <div className="py-4">
          <span className="md-2 text-md">Email</span>
          <input type="email" 
          autoComplete='false'
          className='w-full focus:outline-none  p-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500'
          
          required />
        </div>
        <div className="py-4">
          <span className='mb-2 text-md'>Password</span>
          <div className='flex w-full p-2 border border-gray-500 rounded-md'>
          <input type="password"
          autoComplete='false'
          className=' h-full border-none focus:outline-none placeholder:font-light placeholder:text-gray-500'
          required />
          <RemoveRedEyeIcon/>
          </div>
        </div>
        <div className="flex justify-between w-full py-4">
          <div className="mr-24">
            <input type="checkbox" className='mr-2' />
            <span className='text-md'>Remember Me</span>
          </div>
          <span className='font-bold text-md'>Forgot Password?</span>
        </div>
        <button className='w-full transition-all duration-150 bg-black text-white p-2 rounded-lg mb-6 hover:bg-white
         hover:text-black hover:border hover:border-gray-300'>
          Sign In
         </button>
         <button className='w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white'>
          <img src="https://img.icons8.com/fluency/512/google-logo.png" alt="google-icon" className='w-6 h-6 inline mr-2' />
          Sign In with Google
         </button>
         <div className="text-center text-gray-400">
          Don't Have an account?
          <span className='font-bold text-black'>Sign Up for free</span>
         </div>
      </div>
      </div>
    </section>
  )
}

export default Login