import React,{ useEffect, useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { toast } from 'react-toastify';


const RegisterComponent = () => {
   
    const navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        // role: "",
        email: "",
        password: "",
        retypePassword: "",

    };

    //Form's fields validation
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(2).max(10).required(),
        lastName: Yup.string().min(2).max(10).required(),
        // role: Yup.string().min(2).max(10).required(),
        email: Yup.string().min(4).max(10).required(),
        password: Yup.string().required('Please enter your password.').min(8, 'Your password is too short.'),
        retypePassword: Yup.string().required('Please retype your password.').oneOf([Yup.ref('password')], 'Your passwords do not match.')

    });

    //Saving user on Submit
    const onSubmit = (data) =>{
        axios.post("http://localhost:4000/users/register", JSON.stringify(data),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((response)=>{
            console.log(data)
        console.log("user inserted!");
        toast.success("Registration successfull successfully")
        navigate('/');
    });
    };

    
    
  return (
    <div className='regContainer'>
         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
         >
        
        <Form className="formContainer">
        <h3>Registration</h3>
          <label>First Name: </label>
          <ErrorMessage name="First Name" component="span"  className='errorMessage'/>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="firstName"
            placeholder="First Name"
          />

          <label>Last Name: </label>
          <ErrorMessage name="Last Name" component="span"  className='errorMessage'/>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="lastName"
            placeholder="Last Name"
          />

          {/* <label>Role: </label>
          <ErrorMessage name="role" component="span" className='errorMessage' />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="role"
            placeholder="(Ex. User)"
          /> */}

          <label>Email: </label>
          <ErrorMessage name="email" component="span" className='errorMessage' />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="email"
            placeholder="Email"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" className='errorMessage'/>
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Password"
          />

          <label>Confirm Password: </label>
          <ErrorMessage name="retypePassword" component="span" className='errorMessage'/>
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="retypePassword"
            placeholder="Confirm Password"
          />

          <button type="submit"> Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterComponent