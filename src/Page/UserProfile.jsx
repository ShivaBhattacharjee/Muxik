import React, { useEffect, useState, useRef } from 'react'
import { useLoginContext } from '../Context/LoginContext'
import { useNavigate } from 'react-router-dom'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { ProfilePicture } from '../Utils/ProfilePicture';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useUserDetailsContext } from '../Context/UserDetailsContext';
import { ErrorNotify, SuccessNotify } from '../Utils/toast';
import { toast } from 'react-hot-toast';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
const UserProfile = () => {
  const { username, loggedIn, logout } = useLoginContext()
  const { data, UpdateUserProfile, error, profileData, fetchUserDetails } = useUserDetailsContext()
  const navigate = useNavigate()
  const [profilepicture, setprofilepicture] = useState("")
  const [openModel, setOpenModel] = useState(false)
  const [newUsername, setNewUsername] = useState("")
  // const [newPassword, setNewPassword] = useState("")
  const modelRef = useRef();



  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        setOpenModel(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleProfileChange = async () => {
    setOpenModel(false)
    const profile = {
      profile: profilepicture
    }
    if (ProfilePicture !== "") {
      await UpdateUserProfile(profile)

    } else {
      toast.error("Something went wrong")
    }
  }

  const handleUserNameChange = async () => {
    const profile = {
      username: newUsername
    };
    try{
    await UpdateUserProfile(profile);
    logout();
    navigate("/login"); // Redirect the user to the login page
    toast("Please login back",{
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }catch(error){
    toast.error("Error updating profile",{
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }
  };
  


  useEffect(() => {
    if (profileData?.message === "Records updated") {
      fetchUserDetails(username)
      toast.success("Profie updated", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }
  }, [profileData])


  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  })

  return (
    <div className='p-4 md:p-6 lg:p-8 flex justify-center items-center bg-[#2d1b69] h-screen'>

      {profileData && <SuccessNotify message={"Profile updated"} />}
      {error && <ErrorNotify message={"Error updating profile"} />}
      <div className="max-w-sm rounded-2xl text-[#1A2421] lg:backdrop-blur-lg  p-8 md:p-10 lg:p-10 bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-2xl -translate-y-10 relative" ref={modelRef}>
        <div className='w-32 h-32 border-solid border-2 border-blue-200 hover:grayscale duration-200  cursor-pointer rounded-full absolute -top-20 left-0 right-0 translate-x-[75%]' onClick={() => setOpenModel(true)}>
          <LazyLoadImage src={data?.profile} alt={`${username}-profile`} className='rounded-full' effect='blur' />
        </div>
        <div className={`duration-120 w-full  transition-all ${openModel ? "h-48" : "h-0"}  overflow-y-scroll bg-black  rounded-lg absolute left-0 -top-20 text-white`}>
          <div className='p-2 flex justify-end cursor-pointer sticky top-0 '>
            <CloseIcon onClick={() => setOpenModel(false)} />
          </div>
          <div className='flex justify-center items-center flex-wrap gap-8 p-3 overflow-y-scroll'>
            {
              ProfilePicture?.map((profile) => {
                return (
                  <div key={profile?.title} className='w-24 lg:w-20'>
                    <LazyLoadImage src={profile?.picture} alt='profile-images' className=' rounded-full cursor-pointer z-50'
                      onClick={() => {
                        setprofilepicture(profile.picture);
                        handleProfileChange(profilepicture);
                      }}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
        <h1 className='font-bold text-gray text-xl mb-4 mt-7 text-center'>Konnichiwa,{username}</h1>
        <label htmlFor="username" className="relative block mb-4 text-black/50 focus-within:text-black">
          <AlternateEmailIcon className='transition pointer-events-none w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2' />
          <input
            className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50 transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 bg-black/20 focus:bg-black/25 text-[#333] focus:text-gray-900"
            type="text"
            name="username"
            autoComplete='false'
            placeholder="Username"
            defaultValue={username}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </label>


        <label htmlFor="username" className="relative block mb-4 text-black/50 focus-within:text-black">
          <AlternateEmailIcon className='transition pointer-events-none w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2' />
          <input
            className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50 transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 bg-black/20 focus:bg-black/25 text-[#333] focus:text-gray-900"
            type="text"
            name="username"
            autoComplete='false'
            placeholder="Email"
            defaultValue={data?.email}
            disabled
          />
        </label>

        {/* <label htmlFor="username" className="relative block mb-4 text-black/50 focus-within:text-black">
          <AlternateEmailIcon className='transition pointer-events-none w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2' />
          <input
            className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50 transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 bg-black/20 focus:bg-black/25 text-[#333] focus:text-gray-900"
            type="text"
            name="username"
            autoComplete='false'
            placeholder="Password"

            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label> */}
        {newUsername && (
          <button className=' w-full rounded-lg font-bold text-white focus:outline-none p-3 md:p-4 lg:p-4 transition-colors duration-500 bg-blue-800 hover:bg-blue-700 mb-3 flex items-center justify-center gap-2' onClick={handleUserNameChange}>
            <SyncAltIcon/> Update</button>
        )}

        <button onClick={logout} className='form-input w-full rounded-lg font-bold text-white focus:outline-none p-3 md:p-4 lg:p-4 transition-colors duration-500 bg-blue-800 hover:bg-blue-700 flex items-center gap-3 justify-center'>
          <LogoutIcon />
          Logout</button>
      </div>
    </div>
  )
}

export default UserProfile;
