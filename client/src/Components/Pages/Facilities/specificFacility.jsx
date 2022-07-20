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


  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {   
    getAllTickets();
  }, [])

//   const getAllTickets = () =>{
//     privateAxios.get("/tickets")
//     .then((response)=>{
//         console.log(response.data)
//         setTickets(response.data);
//     })
//     .catch((error)=>{
//         console.log(error);
//     })}
  
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
  <table className='tickets_table_content'>
                <thead>
                <tr>
                <th>Title </th>
                <th>Facility</th> 
                <th>Creator</th> 
                <th>Creator's Email</th> 
                <th>Status</th> 
                <th>Assignee</th> 
                <th>Priority</th> 
                <th>Due Date</th> 
                <th>Date Created</th> 
                {/* <th> update</th>   */}
                     
                </tr>
                </thead>

                <tbody>
                        {
                        // tickets.filter((ticket)=>{
                        //     if(ticket.facility === facilityname){
                        //         return ticket;
                        //     } 
                        // }
                        //  )}
                        // {
                        tickets.map (ticket => 
                                <tr key = {ticket.id}>

                                    <td> {ticket.title} </td>
                                    <td> {ticket.facility} </td>
                                    <td> {ticket.creatorsFirstName} {ticket.creatorsLastName} </td>
                                    <td>{ticket.creatorsEmail}</td>
                                    <td>{ticket.ticket_status}</td>
                                    <td>{ticket.assignee}</td>
                                    <td>{ticket.priority}</td>
                                    <td>{(moment(ticket.due_date).format('DD-MM-YYYY'))}</td>
                                    <td>{(moment(ticket.createdAt).format('DD-MM-YYYY'))}</td>
                                   
                                    
                                    
                        </tr>
                            
                        )    

                            
                    }
            
                </tbody>

            </table>
        
  </div>
)
};
 
export default SpecificFacilityComponent