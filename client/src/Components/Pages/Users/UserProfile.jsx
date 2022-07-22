import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import './UserProfile.css'
import { toast } from 'react-toastify';
import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";


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
    
    //Getting loggedin's role from accessToken.
    const { auth } = UseAuth();
    const decodedAccessToken = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined
    const UserRoles = decodedAccessToken?.roles || null;
    const [RoleId, setRoleId] = useState(UserRoles);
    const usersFirstName = decodedAccessToken?.firstName || null;
    const usersLastName = decodedAccessToken?.lastName || null;

    useEffect(() => {
        getUserProfile();
  }, [])

    //Getting user details from API
    const getUserProfile = () =>{
        privateAxios.get(`/users/userProfile/${id}`)
        .then((response)=>{
            console.log(response?.data);
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
      // console.log(response.accessToken);
      console.log(JSON.stringify(response));
      toast.success("User Updated Succesfully");
      navigate('/home')
      //clear input fields
    } catch (err) {
     console.log(err)

    }
  
  };


  return (
    <div className='addTicket'>
      <div className="addTicketContent">
      <div className="title">
      <h3 className="text-center">{usersFirstName} {usersLastName}</h3>
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