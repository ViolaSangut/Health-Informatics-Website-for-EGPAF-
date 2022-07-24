import UseAuth from "../context/UseAuth";
import jwt_decode from "jwt-decode";


const { auth } = UseAuth();

//Getting loggedin's user roles, email from accessToken.
const decodedAccessToken = auth?.accessToken
      ? jwt_decode(auth.accessToken)
      : undefined
const UserRoles = decodedAccessToken?.roles || null;
const loggedinUserRoles = UserRoles?.toString();
const loggedinUserEmail = decodedAccessToken?.email || null;

export {loggedinUserRoles, loggedinUserEmail}