import React from 'react'
import axios from "axios";
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import egpaf_logo from '../../../Resources/Images/egpaf_logo.PNG'
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';



const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth, auth } = useContext(AuthContext);



  const login1 = (e) => {

    e.preventDefault();

    axios.post('http://localhost:4000/users/login', JSON.stringify({email, password}),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => {
      if(response.data.error){
        alert(response.data.error);
      }
     else{
      setAuth({
        accessToken:response?.data?.accessToken,
        email: response.data.email, 
        firstName: response.data.firstName,
        id: response.data.id, 
        // status: true
      });
      console.log(auth);
      navigate('/home');
    }

    });
  };


  return (
    <div>
      <div className='logo'>
          <img  src={egpaf_logo} alt=''/>
       </div>
    <div className="loginContainer">
      <div className='loginContainer'>
        <h5>HEALTH INFORMATION SYSTEM</h5>
        <input 
          placeholder='Username'
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          autoComplete='off'
        />
        <input
           placeholder='Password'
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
       <div>
          <button onClick={login1}> Sign in </button>
          <p>
             Don't have account? 
            <Link to = '/add-user'   style = {{marginLeft:"30px"}}> Register</Link>
          </p>
          
       </div>
        
        </div>
    </div>
    </div>
  )
}

export default Login