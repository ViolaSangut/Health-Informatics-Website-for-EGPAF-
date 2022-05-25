import React from 'react'
import axios from "axios";
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';



const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const login = () => {
      
   
    navigate('/home');
   
  };


  return (
    <div className="loginContainer">
      <div className='formContainer'>
        <h5>HEALTH INFORMATION SYSTEM</h5>
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button onClick={login}> Sign in </button>
        </div>
    </div>
  )
}

export default Login