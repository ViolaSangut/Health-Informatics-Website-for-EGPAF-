import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "./UseAuth";

import React from 'react'

const CheckAuth = ({ allowedRoles }) => {
    const {auth} = UseAuth();
    const location = useLocation();

  return (
    
    auth?.roles?.find(role => allowedRoles?.includes(role))
    ? <Outlet/>
    : auth?.email
    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    : <Navigate to="/" state={{ from: location }} replace/>
  )
}

export default CheckAuth