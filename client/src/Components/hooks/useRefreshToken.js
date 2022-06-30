import axios from "axios"
import UseAuth from "../context/UseAuth"
import { useState } from "react";

const useRefreshToken = () => {
    const { setAuth } = UseAuth();

    //Getting new accessToken from refreshtoken
    const refresh = async () => {
     
        const response = await axios.get("http://localhost:4000/refresh",  {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        setAuth(prevState => {

            return { 
                ...prevState,
                accessToken:response.data.accessToken 
            }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken