import React from 'react'
import axios from "axios";
import { useState, useEffect, useRef, useContext } from 'react';
// import './Login.css';
import egpaf_big_logo from '../../../Resources/Images/egpaf_big_logo.jpg'
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
    
    <div className ="vh-100" style={{"background-color":"#dbe9f4"}}>
    
    <div class="row d-flex justify-content-center align-items-center h-100 m-3">
      <div class="col col-xl-8">
    <div class="card" style={{"border-radius": "1rem"}}>
      <div class="row g-0">
        <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src={egpaf_big_logo}
                alt="login form" class="img-fluid" style={{"border-radius": "1rem 0 0 1rem"}} />
            </div>
    <div class="col-md-6 col-lg- d-flex align-items-center">
    <div class="card-body p-4 p-lg-4 text-black">
    <p ref={errorRef} className={errorMessage ? "errmsg" :  "offscreen"} aria-live="assertive">{errorMessage}</p>
      <form >
        <h4 class="fw-normal mb-3 pb-3 font-weight-bold" style={{"color":"Green"}}>EGPAF Health Information System</h4>
        <div class="form-floating mb-4 ">
        
        <input 
        id="floatingInput"
          className='form-control form-control-sm'
          placeholder='Username'
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          autoComplete='off'
          ref={emailRef}
        />
        <label  for="floatingInput">
          Email
        </label>
        </div>
        <div class="form-floating mb-4">
        
        <input 
        id="floatingPass"
        className='form-control form-control-sm'
           placeholder='Password'
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <label for="floatingPass">
          Password
        </label>
        </div>
       <div class="pt-1 mb-4">
          <button className="btn btn-outline-success col-sm-6" type="button"onClick={login}> Sign in </button>
          <p className="mt-2 mb-5 pb-lg-2" >
             Do Not have an account? 
            <Link to = '/add-user'   style = {{marginLeft:"30px"}}>Register</Link>
          </p>
          
       </div>
        
        </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  
  )
}

export default Login