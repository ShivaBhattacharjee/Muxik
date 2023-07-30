import React, { useContext, createContext, useEffect, useState } from "react";
import BackEndService from "../services/BackEndService";
import { useLoginContext } from "./LoginContext";

const profileContext = createContext()

const ProfileProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
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

    return (
        <profileContext.Provider value={{ data, error, fetchUserDetails, loading }}>
            {children}
        </profileContext.Provider>
    )
}

const useUserDetailsContext = () => useContext(profileContext)

export { ProfileProvider, useUserDetailsContext }