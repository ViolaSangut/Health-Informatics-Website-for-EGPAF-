import React from 'react'
import "./InventorySummary.css"
import { privateAxios } from '../../api/axios';
import {useEffect, useState} from "react"

function InventorySummary() {

    const [tabletCount, setTabletCount ] = useState("");
    const [simCount, setSimCount ] = useState("");

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
    <div className="inventorySum" onClick={tabClicked}>
      <h3>Tablets: <b>{ `${tabletCount}`}</b></h3></div>
    <div className="inventorySum" onClick={tabClicked}>
      <h3>Simcards: <b>{`${simCount}`}</b></h3></div>
    </div>
  )
}

export default InventorySummary