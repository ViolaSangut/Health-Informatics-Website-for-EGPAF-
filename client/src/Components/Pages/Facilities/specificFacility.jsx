import React, { useState, useEffect } from "react" ;

import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { toast } from 'react-toastify' ;
import Tickets from "../Tickets/Tickets";
import moment from 'moment';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import Simcards from "../Inventory/Simcards";

 
  
  const SpecificFacilityComponent = () => {
  const [facilities, setFacilities] = useState([]);
  const [cards, setCards] = useState([]);
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
  const [searchTickets, setSearchTickets] = useState("");
  const[searchCard, setSearchCard] = useState("");
  const private_axios = usePrivateAxios();
  const [items, setItems] = useState([]);
  const [tickets, setTickets] = useState([]);
  

  
  useEffect(() => {   
    getAllTickets();
  }, [])
 
  useEffect(() => {

    getAllCards();
  
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

useEffect(() => {
 
    getAllItems()
  
}, [])

//List all items in the inventory
const getAllItems = () =>{
    private_axios.get("/Inventory")
    .then((response)=>{
        // console.log(response.data)
        setItems(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
}

//get all facilities from db
const getAllFacilities = () =>{
    axios.get("http://localhost:4000/facilities")
    .then((response)=>{
        console.log(response.data)
        setFacilities(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })}

//list all tickets from db
    const getAllTickets = () =>{
        axios.get("http://localhost:4000/tickets")
        .then((response)=>{
            console.log(response.data)
            setTickets(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })}
    
 //List all cards in the inventory
 const getAllCards = () =>{
    private_axios.get("/simcards")
    .then((response)=>{
        // console.log(response.data)
        setCards(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
}




return (
    <div className="container ">


<h2 className="mt-2 mb-3 text-center">{facilityname}</h2>
          
<div class="list-group">
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
                    <p>WebADT:{WebADT==="1" ? "Not in Use" : `${WebADT}`}</p>
                
            </li>
             <li class="list-group-item ">
                    <p>Ushauri:{ushauri==="1" ? "Not in Use" : `${ushauri}`}</p>

            </li>
            <li class="list-group-item  text-center">
                    <h4>Tablets</h4>                
            </li>
            <li class="list-group-item ">
            <div className='table-responsive' >
            <table className='table  table-striped table-hover table-sm' >
                <thead  >
                <tr >
                   <th>Serial</th>
                   <th>IMEI</th>
                   <th>Brand Name</th>
                   <th>Status</th> 
                   <th>Serial Number</th>
                   <th>Date Registered</th>
        
                   <th>Passcode</th> 
                   <th>Email</th>
                    
        
                    
                </tr>
                </thead>
                <tbody className='ticketsRow'>
                 {
                        items.filter((item)=>{
                            if (item.facility !== null && item.facility.toLowerCase().includes(facilityname.toLowerCase())) {
                                return item;
                            }
                            
                        }
                        
                        ).map (
                             
                            item => 
                            <tr 
                            >
                                <td > {item.id} </td>
                                <td> {item.AssetNumber} </td>
                                <td> {item.AssetName} </td>
                                <td> {item.AssetStatus} </td>
                                <td> {item.serialNumber} </td>
                                <td> {(moment(item.createdAt).format('DD-MM-YYYY | HH:MM'))} </td>
                                
                                <td> {item.Passcode} </td>
                                <td> {item.Email} </td>
                                
                            </tr>
                        
                        )    

                       
                            
                    }</tbody>
                    </table></div>
            
            </li>
            <li class="list-group-item  text-center">
                    <h4>Simcards </h4>                
            </li>
            <li class="list-group-item ">
            <div className='table-responsive' >
            <table className='table  table-striped table-hover table-sm' >
                <thead  >
                <tr >
                   <th>Serial</th>
                    <th>Phone Number</th>
                    <th>IMEI</th>
                    <th>PUK</th>
                    <th>PIN</th>
                    
                    <th>Tablet IMEI</th>
                    
                </tr>
                </thead>
                <tbody className='ticketsRow'>
                 {
                        cards.filter((card)=>{
                            if (card.Facility !== null && card.Facility.toLowerCase().includes(facilityname.toLowerCase())) {
                                return card;
                            }
                            
                        }
                        
                        ).map (
                            card => 
                            <tr key = {card.id}
                                  
                                >
                                   
                                   <td> {card.id} </td>
                                   <td> {card.PhoneNumber} </td>
                                   <td> {card.IMEI} </td>
                                    <td> {card.PUK} </td>
                                   <td> {card.PIN} </td>
                                   <td> {card.PhoneAssigned} </td>

                                 
                                   
                                    
                        </tr>
                        
                        )    

                       
                            
                    }</tbody>
                    </table></div>
            
            </li>
            <li class="list-group-item  text-center">
                 <h4> Tickets and Issues  </h4></li>
            <li class="list-group-item ">
            <div className='table-responsive' >
            <table className='table  table-striped table-hover table-sm' id="TicketsTable">
                <thead  >
                <tr >
                <th >Title </th> 
                <th>Creator</th> 
                <th>Creator's Email</th> 
                <th>Status</th> 
                <th>Assignee</th> 
                <th>Priority</th> 
                <th>Due Date</th> 
                <th>Date Created</th> 
                
                    
                </tr>
                </thead>
                <tbody className='ticketsRow'>
                 {
                        tickets.filter((ticket)=>{
                            if (ticket.facility !== null && ticket.facility.toLowerCase().includes(facilityname.toLowerCase())) {
                                
                                return ticket;
                                
                            }
                            
                        }
                        
                        ).map (
                            ticket => 
                                <tr 
                                >
                                   
                                    <td> {ticket.title} </td>
                                    
                                    <td> {ticket.creatorsFirstName} {ticket.creatorsLastName} </td>
                                    <td>{ticket.creatorsEmail}</td>
                                    <td>{ticket.ticket_status}</td>
                                    <td>{ticket.assignee}</td>
                                    <td>{ticket.priority}</td>
                                    <td>{(moment(ticket.due_date).format('DD-MM-YYYY'))}</td>
                                    <td>{(moment(ticket.created_date).format('DD-MM-YYYY'))}</td>
                                 
                                   
                                    
                        </tr>
                        
                        )    

                       
                            
                    }</tbody>
                    </table></div>
            
            </li>
            
            
            </ul>
        </div> 



        
  </div>
)
};
 
export default SpecificFacilityComponent