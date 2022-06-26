import React from 'react'
import axios from "axios";
import { useState, useEffect, useRef, useContext } from 'react';
import './Login.css';
import egpaf_logo from '../../../Resources/Images/egpaf_logov2.JPG'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import UseAuth from '../../context/UseAuth';
import AuthContext from '../../context/AuthContext';


const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const { setAuth } = UseAuth();
  

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const emailRef = useRef();
  const errorRef = useRef();


  useEffect(() => {
    emailRef.current.focus();
  }, [])


  useEffect(() => {
   setErrorMessage('');
  }, [email, password])



  const login = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/users/login',
          JSON.stringify({ email, password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      if(response.data.error){
        setErrorMessage(response.data.error);
        return
      }
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = [response?.data?.roles];
      const firstName = response?.data?.firstName;
      const lastName = response?.data?.lastName;
      setAuth({ firstName, lastName, email, password, roles, accessToken });
      setEmail('');
      setPassword('');
      setSuccess(true);
      console.log(roles)
      navigate(from, { replace: true });
  } 
  catch (error) { 
    if (!error?.response) {
      setErrorMessage('No Server Response');
  } else if (error.response?.status === 400) {
    setErrorMessage('Missing Username or Password');
  } else if (error.response?.status === 401) {
    setErrorMessage('Unauthorized');
  } else {
    setErrorMessage('Login Failed');
  }   
    errorRef.current.focus();
  }

    
  };


  return (
    <>
    <img  src={egpaf_logo} alt=''/>
    <div align ="middle">
          
    <section >
    <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
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
          ref={emailRef}
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
          <button className="button" onClick={login}> Sign in </button>
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