import { Outlet } from "react-router-dom" ;
import { useState, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import UseAuth from "../context/UseAuth";

import React from 'react';

const PersistLogin = () => {
  const { auth } = UseAuth();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true; 

    const verifyRefreshToken = async () => {
        try {
            await refresh();
        }
        catch (err) {
            console.error(err);
        }
        finally {
          isMounted && setIsLoading(false);
        }
    }
    //Getting new accessToken using RefreshToken if it's absent or has expired
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false ;
}, [])

    return (
        <>
            {isLoading
                    ? <p>Loading... </p>
                    : <Outlet />
            }
        </>
    )
    
}

export default PersistLogin