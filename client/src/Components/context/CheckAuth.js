import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "./UseAuth";
import jwt_decode from "jwt-decode";


const CheckAuth = ({ allowedRoles }) => {
    const {auth} = UseAuth();
    const location = useLocation();

    //Getting loggedin's user's roles from accessToken.
    const decodedAccessToken = auth?.accessToken
          ? jwt_decode(auth.accessToken)
          : undefined
          const roles = decodedAccessToken?.roles || [];
          // const loggedinUserRoles = roles?.toString();

  return (
    //Checking user's role(s) and auth status
    // loggedinUserRoles === "5" 
    // ? <Navigate to="/unauthorized"/>
    roles.find(role => allowedRoles?.includes(role))
    ? <Outlet/>
    : auth?.email
    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    : <Navigate to="/" state={{ from: location }} replace/>
  )
}

export default CheckAuth