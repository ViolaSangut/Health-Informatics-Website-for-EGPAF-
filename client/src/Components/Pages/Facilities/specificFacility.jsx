import React, { useState, useEffect } from "react" ;


import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify' ;
import Tickets from "../Tickets/Tickets";


const SpecificFacilityComponent = () => {

  const [facilities, setFacilities] = useState([]);
  const { id } = useParams();
  const facility = facilities.find(facility => (facility.id).toString() === id);
  const [facilityname, setFacilityName] = useState("");
  const [mflcode, setMFLcode] = useState("");
  const [subcounty, setSubcounty] = useState("");
  const [status, setStatus] = useState("");
  const [ipaddress, setIpaddress] = useState("");
  const [county, setCounty] = useState("");
  const [ushauri, setUshauri] = useState("");
  const [WebADT, setWebADT] = useState("");
  const [elasticipaddress,setElasticipaddress] = useState("");


  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {   
    getAllTickets();
  }, [])

  const getAllTickets = () =>{
    axios.get("http://localhost:4000/tickets")
    .then((response)=>{
        console.log(response.data)
        setTickets(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })}
  
  useEffect(() => {
    if (facility) {
        setFacilityName(facility.facilityname);
        setMFLcode(facility.mflcode);
        setSubcounty(facility.subcounty);
        setStatus(facility.status);
        setIpaddress(facility.ipaddress);
        setCounty(facility.county);
        setUshauri(facility.ushauri);
        setWebADT(facility.WebADT);
        setElasticipaddress(facility.elasticipaddress);
    }
}, [facility])
  useEffect(() => {   
    getAllFacilities();
}, [])

const getAllFacilities = () =>{
    axios.get("http://localhost:4000/facilities")
    .then((response)=>{
        console.log(response.data)
        setFacilities(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })}
    //Adding Condition to change page title dynamically
    

return (
    <div>
  <h2>Facility name:{facilityname}</h2>
  <p>County:{county}</p>
  <p>subcounty:{subcounty}</p>
  <p>IP Address: {ipaddress}</p>
  <p>Elastic IP Address:{elasticipaddress}</p>
  <h2>IMPLEMENTATIONS </h2>
  <p>WebADT:{WebADT}</p>
  <p>Ushauri:{ushauri}</p>
  <h2>TICKETS</h2>
   
  </div>
)
};
 
export default SpecificFacilityComponent