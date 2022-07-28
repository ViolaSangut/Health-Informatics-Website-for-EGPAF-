import React from 'react'
import "./InventorySummary.css"
import { privateAxios } from '../../api/axios';
import {useEffect, useState} from "react"
import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";

function InventorySummary() {

    const [tabletCount, setTabletCount ] = useState("");
    const [simCount, setSimCount ] = useState("");

    const { auth } = UseAuth();

    //Getting loggedin's user details from accessToken.
    const decodedAccessToken = auth?.accessToken
          ? jwt_decode(auth.accessToken)
          : undefined
    const UserRoles = decodedAccessToken?.roles || null;
    const loggedinUserRoles = UserRoles.toString();

  useEffect(() => {
    //counting Homa Bay Facilities
      const countTablets= () =>{
        try {
          privateAxios.get("/Inventory")
          .then((response)=>{
            setTabletCount(response.data.length);
            // console.log(response.data.length)
          })
          
        } catch (error) {
          console.log(error)
        }
      }
      countTablets();
  }, [])

   useEffect(() => {
    //counting Homa Bay Facilities
      const countSimcards= () =>{
        try {
          privateAxios.get("/Simcards")
          .then((response)=>{
            setSimCount(response.data.length);
            // console.log(response.data.length)
          })
          
        } catch (error) {
          console.log(error)
        }
      }
      countSimcards();
  }, [])

  const tabClicked = () => {
    // console.log("Clicked"
    window.location.href = `/Inventory`
  }


  return (
    <div>
    <div className="inventorySum" 
      //Enabling admins & Supers_Users only to access list of Tablets
      onClick={loggedinUserRoles === "3" || loggedinUserRoles === "4" && tabClicked}
    >
      <h3>Tablets: <b>{ `${tabletCount}`}</b></h3>
    </div>
    <div className="inventorySum" 
      //Enabling admins & Supers_Users only to access list of Simcards
      onClick={ loggedinUserRoles === "3" || loggedinUserRoles === "4" && tabClicked}
    >
      <h3>Simcards: <b>{`${simCount}`}</b></h3>
    </div>
    </div>
  )
}

export default InventorySummary