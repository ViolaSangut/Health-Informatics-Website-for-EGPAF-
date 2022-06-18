import './Summary.css'
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios';




const Summary = ({type}) => {

const [allTickets, setAllTickets] = useState('');
const [unassignedTickets, setUnassignedTickets] = useState('');
const [pendingTickets, setPendingTickets] = useState('');
const [resolvedTicket, setresolvedTicket] = useState('');



useEffect(() => {
  countAllTickets();
  countUnassignedTickets();
  countPendingTickets();
  countResolvedTickets();
}, [])

//countingAllTickets
const countAllTickets = () =>{
  try {
    axios.get("http://localhost:4000/tickets/countAllTickets")
    .then((response)=>{
      // console.log(response.data);
      setAllTickets(response.data);
    })
    
  } catch (error) {
    console.log(error)
  }
}

//countingUnassignedTickets
const countUnassignedTickets = () =>{
  try {
    axios.get("http://localhost:4000/tickets/countUnassignedTickets")
    .then((response)=>{
      // console.log(response.data);
      setUnassignedTickets(response.data);
    })
    
  } catch (error) {
    console.log(error)
  }
}

//countPendingTickets
const countPendingTickets = () =>{
  try {
    axios.get("http://localhost:4000/tickets/countPendingTickets")
    .then((response)=>{
      // console.log(response.data);
      setPendingTickets(response.data);
    })
    
  } catch (error) {
    console.log(error)
  }
}

//countResolvedTickets
const countResolvedTickets = () =>{
  try {
    axios.get("http://localhost:4000/tickets/countResolvedTickets")
    .then((response)=>{
      // console.log(response.data);
      setresolvedTicket(response.data);
    })
    
  } catch (error) {
    console.log(error)
  }
}
  let data;

  switch (type) {
    case "Unsigned":
      data = {
        title: "Unsigned",
        value: unassignedTickets,
        className: "Unsigned",
        valueClassName:'valueUnasigned'
      };    
    break;

    case "Pending":
      data = {
        title: "Pending",
        value: pendingTickets,
        className: "Pending",
        valueClassName:'valuePending'
      };    
    break;

    case "Resolved":
      data = {
        title: "Resolved",
        value: resolvedTicket,
        className: "Resolved",
        valueClassName:'valueResolved'
      };    
    break;

    case "Total":
      data = {
        title: "Total",
        value: allTickets,
        className: "Total",
        valueClassName:'valueTotal'
      };    
    break;
  
    default:
      break;
  }
  
  return (
    <div className='summary'>
        <div className='summary_items'>
            <h5>{data.title}</h5> 
            <h2 className={data.valueClassName}>{data.value}</h2>
        </div>
        <div className='summary_items'>
            <MdIcons.MdArrowDropDownCircle/>          
        </div>
    </div>
  )
}

export default Summary