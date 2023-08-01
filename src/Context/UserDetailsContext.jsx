import React, { useContext, createContext, useEffect, useState } from "react";
import BackEndService from "../services/BackEndService";
import { useLoginContext } from "./LoginContext";

const profileContext = createContext()

const ProfileProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const[profileData,setProfileData] = useState(null)
    const [error, setError] = useState(false)
    const { loggedIn, username } = useLoginContext()
    useEffect(() => {
        if (loggedIn && username) {
            fetchUserDetails(username);
        }
    }, [username, loggedIn]);
    const fetchUserDetails = async (username) => {
        try {
            const response = await BackEndService.get(`/user/${username}`)
            setData(response.data)
            setLoading(false)
            console.log(response.data)
        } catch (error) {
            setError(error?.message || "Error getting  details")
            console.log(error?.message || "Error getting details")
        }
    }

    const UpdateUserProfile = async(profile)=>{
        try{
            const response = await BackEndService.put(`/update-user?username=${username}`, profile)
            setProfileData(response.data)
            console.log(response.data.message)
        }catch(error){
            setError(error.message||"Error updating profile picture")
            console.error(error.message||"Error updating profile picture")
        }
    }

    return (
        <profileContext.Provider value={{ data, error, fetchUserDetails, loading, UpdateUserProfile,profileData }}>
            {children}
        </profileContext.Provider>
    )
}

const useUserDetailsContext = () => useContext(profileContext)

export { ProfileProvider, useUserDetailsContext }