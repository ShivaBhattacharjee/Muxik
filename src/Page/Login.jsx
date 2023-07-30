import React, { useEffect, useState } from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useLoginContext } from '../Context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorNotify } from '../Utils/toast';
const Login = () => {
  const { loggedIn, error, login, rememberMe, setRememberMe, loading } = useLoginContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  })
  return (
    <div className="p-4 md:p-6 lg:p-8 flex justify-center items-center bg-[#2d1b69] h-screen">
      <form autoComplete='false' className="max-w-sm rounded-2xl text-[#1A2421] lg:backdrop-blur-lg  p-8 md:p-10 lg:p-10 bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-2xl -translate-y-10">
        {error && <ErrorNotify message = {error}/>}
        <h3 className="mb text-md text-[#1A2421]/80 font-semibold">Login In!</h3>
        <h1 className="mb-3 uppercase font-bold text-xl md:text-2xl lg:text-2xl">Welcome back 👋</h1>
        <p className="mb-6 text-sm text-[#1A2421]/90 text-opacity-50">Enter your valid id password to access your account</p>

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
        <div className='flex justify-between mb-3 items-center'>
          <div className='flex items-center gap-2'>
            <input type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='w-4 h-4 checked:bg-blue-500 checked:text-white' />Remember
          </div>
          <Link to={"/forgot-password"}>
          <span>Forgot password</span>
          </Link>
        </div>
        <button type='submit' className="form-input w-full rounded-lg font-bold text-white focus:outline-none p-3 md:p-4 lg:p-4 transition-colors duration-500 bg-blue-800 hover:bg-blue-700" onClick={handleLogin} disabled={loading || !password || !username}>
        {loading ?  <ClipLoader size={30} color="#fff" speedMultiplier={3} /> : 'Continue'}
        </button>

        <div className="form-footer mt-6 text-center">
          <Link to="/sign-up">
          <p className='text-sm font-semibold text-white'>Create and account</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
