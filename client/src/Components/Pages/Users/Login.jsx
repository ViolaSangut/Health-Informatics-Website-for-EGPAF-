import React from 'react'
import axios from "axios";
import { useState, useEffect, useRef, useContext } from 'react';
import './Login.css';
import egpaf_logo from '../../../Resources/Images/egpaf_logov2.jpg'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import UseAuth from '../../context/UseAuth';
import jwt_decode from "jwt-decode";



const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const { auth, setAuth } = UseAuth();
  
  const [errorMessage, setErrorMessage] = useState('');


  const emailRef = useRef();
  const errorRef = useRef();

    //Getting loggedin's user roles, email from accessToken.
    const decodedAccessToken = auth?.accessToken
          ? jwt_decode(auth.accessToken)
          : undefined
    const UserRoles = decodedAccessToken?.roles || null;
    // const loggedinUserRoles = UserRoles.toString();
    const loggedinUserEmail = decodedAccessToken?.email || null;

  //   if (loggedinUserRoles !== "4" || loggedinUserRoles !== "3" || loggedinUserRoles !== "2" || loggedinUserRoles !== "1") {
  //     localStorage.removeItem("loggedInCheck");
  //   }
  // }

 

  const checkLogin = () =>{
    console.log(auth)
    if (!loggedinUserEmail) {
      // localStorage.removeItem("loggedInCheck");
    }
  }


  useEffect(()=>{
    // checkLogin();
    // if(localStorage.getItem("loggedInCheck")){
    //     navigate('/home')
    // } 
    // else{
    //   navigate('/')
    // }
}, []);



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
      
      const accessToken = response?.data?.accessToken;

      localStorage.setItem("loggedInCheck", "loggedIn");

      setAuth({email, accessToken });
      setEmail('');
      setPassword('');

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

  useEffect(() => {
    console.log(auth?.accessToken)
   }, [])
   



  return (
    <>
    <img  src={egpaf_logo} alt=''/>
    <div align ="middle">
          
    <section >
    <p ref={errorRef} className={errorMessage ? "errmsg" :  "offscreen"} aria-live="assertive">{errorMessage}</p>
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
          <button className="buttonlogin" onClick={login}> Sign in </button>
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