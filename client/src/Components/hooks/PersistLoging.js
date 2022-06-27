import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import UseAuth from "../context/UseAuth";

import React from 'react'

const PersistLoging = () => {
  const { auth } = UseAuth();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    // let isMounted = true;

    const verifyRefreshToken = async () => {
        try {
            await refresh();
        }
        catch (err) {
            console.error(err);
        }
        finally {
       setIsLoading(false);
        }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    // return () => isMounted = false;
}, [])

 
}

export default PersistLoging