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
    <>
    <img  src={egpaf_logo} alt=''/>
    <div align ="middle">
          
    <section >
      <form >
        <h5>HEALTH INFORMATION SYSTEM</h5>
        <label>
          Username or Email
        </label>
        <input className='text'
          placeholder='Username'
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          autoComplete='off'
        />
        <label>
          Password
        </label>
        <input 
           placeholder='Password'
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
       <div>
          <button className="button" onClick={login1}> Sign in </button>
          <p>
             Do Not have an account? 
            <Link to = '/add-user'   style = {{marginLeft:"30px"}}> Register</Link>
          </p>
          
       </div>
        
        </form>
    </section>
    </div>
    </>
  
  )
}

export default Login