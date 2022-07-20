import React,{ useEffect, useState, useRef} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Register.css';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import usePrivateAxios from '../../hooks/usePrivateAxios';
import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";

//regex definitions
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const RegisterComponent = () => {

const private_axios = usePrivateAxios();

const fnameRef = useRef()
const lnameRef = useRef()
const errRef = useRef();
const emailRef = useRef();

const [password, setPassword]= useState("");
const [validPassword, setValidPassword]= useState(false);
const [passwordFocus, setPasswordFocus]= useState(false);


const [matchPassword, setMatchPassword]= useState("")
const[validMatch, setValidMatch]= useState(false);
const [matchFocus, setMatchFocus]= useState(false);

const [firstName, setFirstName] = useState("")
const [validFName, setValidFName]= useState(false);
const [userFocus, setUserFocus]= useState(false);

const[lastName, setLastName]= useState("") 
const [validLName, setValidLName]= useState(false);
const [userFocus2, setUserFocus2]= useState(false);

const[email, setEmail]= useState("");
const [validEmail, setValidEmail]= useState(false);
const [emailFocus, setEmailFocus]= useState(false);


const[errMsg, setErrMsg]= useState("")
const[success, setSuccess]= useState(false)

//Users update implementation
const { id } = useParams();
const [users, setUsers] = useState([])
const user = users.find(user => (user.id).toString() === id);

//Roles
const[roles, setRoles] = useState([]);
const [RoleId, setRoleId] = useState(1);
const [userRoles, setUserRoles] = useState("");

//Getting loggedin's user role, email, firstName & lastName from accessToken.
const { auth } = UseAuth();
const decodedAccessToken = auth?.accessToken
? jwt_decode(auth.accessToken)
: undefined
const loggedinUserEmail = decodedAccessToken?.email || null;
const usersFirstName = decodedAccessToken?.firstName || null;
const usersLastName = decodedAccessToken?.lastName || null;
const UserRoles = decodedAccessToken?.roles || null;
const loggedinUserRoles = UserRoles?.toString();

const [singleUserRole, setSingleUserRole] = useState("")

useEffect(() => {
    fnameRef.current.focus();
    getAllusers();
  }, []);


//checking the firstname and lastname
useEffect(() => { 
  const result = USER_REGEX.test(firstName)
  console.log(result); 
  // console.log(firstName);
  setValidFName(result);
},[firstName]);

useEffect(() => { 
  const result = USER_REGEX.test(lastName)
  console.log(result); 
  // console.log(lastName);
  setValidLName(result);
},[lastName]);

//checking the email address
useEffect(() => { 
  const result = EMAIL_REGEX.test(email)
  console.log(result); 
  // console.log(email);
  setValidEmail(result);
},[email]);

//checking the password and match password
useEffect(() => {
  const result= PWD_REGEX.test(password);
  console.log(result)
  // console.log(password);
  setValidPassword(result)
  setValidMatch(password===matchPassword)},
  [password, matchPassword]);

//error log for inputs
useEffect(()=>{setErrMsg("") 
}, [firstName, lastName, email, password, matchPassword])

   
const navigate = useNavigate();

//Saving user  
const saveUser = async () => {
    //if button is enabled through a JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!id && (!v1 || !v2)) {
      setErrMsg("Invalid Entry");
      return;
    }
    
    try {

      const response = await private_axios.post(
        "/users/register",
        JSON.stringify({ firstName, lastName, email, password, RoleId}),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess(true);
      toast.success("User Registered Succesfully");
      navigate('/')
      //clear input fields
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === "ERR_CONNECTION_REFUSED") {
        setErrMsg("Username taken!");
      } else {
        setErrMsg("Registeration Failed");
      }
      errRef.current.focus();
    }

    setSuccess(true);
  
  };


 //Update User
  const updateUser = async () => {

    //if button is enabled through a JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    
    try {

      const response = await  private_axios.put(`/users/update/${id}`, {
        firstName:firstName, lastName:lastName, email: email, password: password, matchPassword: matchPassword, RoleId: RoleId
      });
      
      console.log(response.data);
      // console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      toast.success("User Updated Succesfully");
      navigate('/list-user')
      //clear input fields
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken!");
      } else {
        setErrMsg("Registeration Failed");
      }
      errRef.current.focus();
    }

    setSuccess(true);
  
  };

  //Getting all users
  const getAllusers = () =>{
    private_axios.get("/users")
    .then((response)=>{
        console.log(response.data)
        setUsers(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
}


  //Filling form with data from API for update
    useEffect(() => {
      if (user) {
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
          setPassword(user.password);
          setMatchPassword(user.password);
          setSingleUserRole(user.Role.role);
      }
    }, [user])

    //Update or Save user
    const submitUser = (e) =>{

      e.preventDefault();

      if(id){
        updateUser();
      } 
      else {
        saveUser();

      }
      
  }


     //Changing page title dynamically
     const pageTitle = () =>{

      if(id){
          return <h3 className="text-center">Update User</h3>
      } 
      else {
          return <h3 className="text-center">Registration</h3>

      }
      
  }

  //Getting roles
  const getRoles = () =>{
    private_axios.get("/roles")
    .then((response)=>{
        console.log(response.data)
        setRoles(response.data);
        setUserRoles(response.data.role);
    })
    .catch((error)=>{
        console.log(error);
    })
}

useEffect(()=>{
  getRoles();
}, [])


let addUpdateEmailPassword = 
    <>
      {/* Email input */}
      <label>Email
        <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validEmail || !email ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
      </label>

      <input
        autoComplete="off"
        id="email"
        placeholder="Email"
        type="text"
        ref= {emailRef}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-invalid={validEmail ? "false" : "true"}
        aria-describedby="emailidnote"
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        value={email}
      />
      <p
          id="emailidnote"
          className={
            emailFocus && email && !validEmail
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          <br />
          Must be a Valid email address!
        </p>

        {/* password input */}
        <label>Password 
            <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
          </label>
          <input
            autoComplete="off"
            type="password"
            id="pwdnote"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            value={password}
          />
           <p
              id="pwdnote"
              className={passwordFocus && !validPassword ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>
          {/* Confirm password */}
          <label>Confirm Password 
            <span className={validMatch ? "valid" : "hide"}>
            <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPassword ? "hide" : "invalid"}
              />
              </span>
              </label>.
            
          <input
            autoComplete="off"
            type="password"
            id="confpwdid"
            name="retypePassword"
            placeholder="Confirm Password"
            onChange={(e) => setMatchPassword(e.target.value)}
            value={matchPassword}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confpwdid"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            
          />
         <p
              id="confpwdid"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
    </>
    
    
  return (
    <div  align="middle" >
         <section>        
        <form className="" onSubmit={submitUser}>
          <p 
          ref={errRef}
          className={errMsg?"errmsg":"offscreen"}
          aria-live ="assertive"
          >
            {errMsg}
          </p>
        {/* Page Title */}
        {
          pageTitle()
        }
        {/* First name input */}

          <label>First Name 
            <span className={validFName?"valid":"hide"}>
              <FontAwesomeIcon icon={faCheck} 
            />
            </span>
            <span className={validFName || !firstName ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} 
            />
            </span>
          </label>

          <input
            autoComplete="off"
            id="firstnameid"
            type="text"
            placeholder="First Name"
            ref={fnameRef}
            onChange={(e) => setFirstName(e.target.value)}
            aria-describedby="firstnameid"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            value={firstName}
           

          />
          <p
              id="firstname"
              className={
                userFocus && firstName && !validFName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must Start with a letter.
              <br />
              Only letters allowed.
            </p>
         {/* Lastname Input */}
          <label>Last Name 
            <span className={validLName?"valid":"hide"}>
            <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validLName || !lastName ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            autoComplete="off"
            id="lastnameid"
            type="text"
            placeholder="Last Name"
            ref={lnameRef}
            onChange={(e) => setLastName(e.target.value)}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus2(true)}
            onBlur={() => setUserFocus2(false)}
            value={lastName}

          />
          <p
              id="lastnameid"
              className={
                userFocus2 && lastName && !validLName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must Start with a letter.
              <br />
              Only letters allowed.
            </p>

            {/* Roles */}
            { id ?
               (
                //Enabling Super user to update all users roles except for his / hers
                (loggedinUserEmail !== email) && (loggedinUserRoles === "4" || singleUserRole === "Admin" || singleUserRole === "Manager" || singleUserRole === "User") ?
                <>
                  <label>Roles</label>
                          <select value={RoleId} onChange ={(e) => setRoleId(e.target.value)}>
                              <option selected disabled="false" >{singleUserRole}</option>
                              {
                                  roles.map((role)=>(<option key={role.id}value={role.id}>
                                    {role.role}
                                  </option>))
                              }
                          </select>
                </>
                //Enabling Admin to update all users roles except for Super user and his / hers
                :(loggedinUserEmail !== email) && ((loggedinUserRoles === "3" && singleUserRole !== "Super_User") || singleUserRole === "Manager" || singleUserRole === "User") ?
                <>
                  <label>Roles</label>
                          <select  onChange ={(e) => setRoleId(e.target.value)}>
                              <option selected disabled="true" >{userRoles}</option>
                              {
                                  roles.map((role)=>(<option key={role.id}value={role.id}>
                                    {role.role}
                                  </option>))
                              }
                          </select>
                </>
                :<></>
               )
             :<></>
            }
            
        {/* Email & Password*/}
        { 
        ( 
          //Adding Email & Password
          !id?
          ( 
            addUpdateEmailPassword
          )
          // Updating Email & Password
          : (id && loggedinUserRoles === "4") || (singleUserRole === "Admin" || singleUserRole === "Manager" || singleUserRole === "User") ?
          ( 
            addUpdateEmailPassword
          )
          : (id && loggedinUserRoles === "3") && singleUserRole === "Super_User"?
          <></>
          : (id && loggedinUserRoles === "3") || (singleUserRole === "Manager" || singleUserRole === "User") ?
          ( 
            addUpdateEmailPassword
          )
          :<></>
        )
        }
        
         {/* Submit Button */}
          {
           !id ?
           <button className='buttons'
             disabled={!validFName || !validLName || !validPassword || !validEmail || !validMatch ? true : false}> Submit
           </button>
           :id ?
           <button className='buttons'
             disabled={!validFName || !validLName ? true : false}> Submit
           </button>
           :<></>
           }
        </form>
        <p>
            Already registered?
            <span className="line">{/* Put the router Link here */}</span>
          </p>
          <a href="http://localhost:4001/">Sign In</a>
      </section>
    </div>
  )
}

export default RegisterComponent