// under development
import React, { useContext, useState, createContext } from "react";
import BackEndService from "../services/BackEndService";

const ForgotPasswordContext = createContext()

export function useForgotPasswordContext() {
    return useContext(ForgotPasswordContext)
}

export function ForgotPasswordProvider({ children }) {
    const [data, setData] = useState(null)
    const [verifyData , setVerifyData] = useState(null)
    const [error, setError] = useState(null)
    const [emailSentTo, setEmailSentTo] = useState(null);

    const forgotPassword = async (userData) => {
        try {
            const response = await BackEndService.post("/reset-password", userData); // Add 'await' here
            setData(response);
            setEmailSentTo(userData?.email); 
        } catch (error) {
            console.error(error?.message || "Error sending otp");
            setError(error?.message || "Error sending reset OTP");
        }
    }

    const verifyForgotPassword = async(newPassData)=>{
        try{
            const response = await BackEndService.post("/verify-reset-password", newPassData)
            setVerifyData(response)
            console.log(response)
        }catch(error){
            console.error(error?.message )
            setError(error?.message || "Error verifying otp")
        }
    }
    return (
        <ForgotPasswordContext.Provider value={{ forgotPassword, error, emailSentTo, data, verifyForgotPassword, verifyData  }}>
            {children}
        </ForgotPasswordContext.Provider>
    )
}

