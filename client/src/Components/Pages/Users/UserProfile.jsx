import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import './UserProfile.css'
import { toast } from 'react-toastify';
import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";
import { gettingLoggedUserRoleName } from "./Users";  //CgProfile
import * as CgIcons from "react-icons/cg";
const UserProfile = () => {

    const {id} = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState("");
    const [user, setUser] = useState([]);
    const navigate = useNavigate(); 
    const privateAxios = usePrivateAxios();
    let UserRoleId;
    
    //Getting loggedin's role from accessToken.
    const { auth } = UseAuth();
    const decodedAccessToken = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined
    const UserRoles = decodedAccessToken?.roles || null;
    // const loggedinUserRoles = UserRoles.toString();
    const [RoleId, setRoleId] = useState(UserRoles);
    
    const usersFirstName = decodedAccessToken?.firstName || null;
    const usersLastName = decodedAccessToken?.lastName || null;

    const StringfiedRoleId = JSON.stringify(RoleId)
    UserRoleId = StringfiedRoleId.substring(1, StringfiedRoleId.length-1)
    

   
    useEffect(() => {
        getUserProfile();
       
  }, [])

    //Getting user details from API
    const getUserProfile = () =>{
        privateAxios.get(`/users/userProfile/${id}`)
        .then((response)=>{
            setUser(response?.data);
            setFirstName(response?.data?.firstName);
            setLastName(response?.data?.lastName);
            setEmail(response?.data?.email);
            setPassword(response?.data?.password);
            setMatchPassword(response?.data?.password);
        })
        .catch((error)=>{
            console.log(error)
        })
    }


  //Update User
  const updateUser = async () => {
    
    try {

      const response = await  privateAxios.put(`/users/update/${id}`, {
        firstName:firstName, lastName:lastName, email: email, password: password, matchPassword: matchPassword, RoleId: RoleId
      });
      
      console.log(response.data);
      toast.success("User Updated Succesfully");
      navigate('/home')

    } catch (err) {
     console.log(err)

    }
  
  };


  return (
    <div className='profile'>
      <div className="profileContent">
      <div className="title">
      <CgIcons.CgProfile className="profileIcon"/>
      <h3 style={{color:"black"}} className="text-center">Profile</h3>
      <h4 className="text-center">{usersFirstName} {usersLastName}</h4>
      </div>
      <div className="form">
        <div className="inputfield">
            <label>First Name</label>
            <input type="text" className="input"  
            value={firstName} 
            onChange={(e) =>setFirstName(e.target.value)}
            />
        </div>  

        <div className="inputfield">
            <label>Last Name</label>
            <input type="text" className="input"  
            value={lastName} 
            onChange={(e) =>setLastName(e.target.value)}
            />
        </div>  

        <div className="inputfield">
            <label>Email</label>
            <input type="text" className="input"  
            value={email} 
            onChange={(e) =>setEmail(e.target.value)}
            />
        </div> 

        { UserRoles !== null &&
           <div className="inputfield">
           <label>Role</label>
           <input type="text" className="input" 
           disabled={true} 
           value={UserRoleId === "1" ? "User" : UserRoleId === "2" ? "Manager": UserRoleId === "3" ? "Admin" : UserRoleId === "4" ? "Super-User" : ""} 
           />
       </div> 
        }

         {/* <div className="inputfield">
            <label>Password</label>
            <input type="text" className="input"  
            value={password} 
            onChange={(e) =>setPassword(e.target.value)}
            />
        </div>  

        <div className="inputfield">
            <label>Confirm Password</label>
            <input type="text" className="input"  
            value={matchPassword} 
            onChange={(e) =>setMatchPassword(e.target.value)}
            />
        </div>    */}


        <div className="inputfield">

    
          <Link to="" className="btn btn-info" style={{width: "50%", marginLeft: "20%", marginBottom: "2%"}} onClick={(e) => updateUser(e)}> Update</Link>
                  
          <Link to="/tickets-list" className="btn btn-dark" style={{width: "50%", marginLeft: "20%", marginBottom: "0%"}}>Back</Link>
          </div>
      </div>
     </div>	
    </div>
  )
}

export default UserProfile