import React, { useState, useEffect } from "react" ;


import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify' ;
import Tickets from "../Tickets/Tickets";
import moment from 'moment';
import { privateAxios } from "../../api/axios";

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
  const navigate = useNavigate();


  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {   
    // getAllTickets();
  }, [])

  
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


    const getAllTickets = () =>{
        axios.get("http://localhost:4000/tickets")
        .then((response)=>{
            console.log(response.data)
            setTickets(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })}
    
    

return (
    <div className="container ">


<h2 className="mt-2 mb-3 text-center">{facilityname}</h2>
<div >
          
<div class="list-group ">
  <ul>
            <li  class="list-group-item">
                  <p>County:{county}</p>

            </li>
            <li class="list-group-item">
                 <p>Sub-County:{subcounty}</p>
            </li>
            <li class="list-group-item list-group-item-action ">
                  <p>IP Address: {ipaddress}</p>
            </li>
            <li class="list-group-item list-group-item-action">
                  <p>Elastic IP Address:{elasticipaddress}</p>
                
            </li>
            <li class="list-group-item  text-center">
                    <h4>HIS System Implementations </h4>                
            </li>
            <li class="list-group-item ">
                    <p>WebADT:{WebADT}</p>
                
            </li>
             <li class="list-group-item ">
                    <p>Ushauri:{ushauri}</p>

            </li>
             <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                 <p> Tickets and Issues</p>
                <span class="badge bg-danger">10</span>
            </li>
            </ul>
        </div> 


</div>
        
  </div>
)
};
 
export default SpecificFacilityComponent