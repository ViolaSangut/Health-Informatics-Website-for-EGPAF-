import './Summary.css'
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import { useState, useEffect } from 'react';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import { useNavigate } from 'react-router-dom';

const Summary = ({type}) => {

const [allTickets, setAllTickets] = useState('');
const [unassignedTickets, setUnassignedTickets] = useState('');
const [pendingTickets, setPendingTickets] = useState('');
const [resolvedTicket, setresolvedTicket] = useState('');
const privateAxios = usePrivateAxios();
const navigate = useNavigate();

useEffect(() => {
  countAllTickets();
  countUnassignedTickets();
  countPendingTickets();
  countResolvedTickets();
}, [])

//countingAllTickets
const countAllTickets = () =>{
  try {
    privateAxios.get("/tickets/countAllTickets")
    .then((response)=>{
      setAllTickets(response.data);
    })
    
  } catch (error) {
    console.log(error)
  }
}

//countingUnassignedTickets
const countUnassignedTickets = () =>{
  try {
    privateAxios.get("/tickets/countUnassignedTickets")
    .then((response)=>{
      setUnassignedTickets(response.data);
    })
    
  } catch (error) {
    console.log(error)
  }
}

//countPendingTickets
const countPendingTickets = () =>{
  try {
    privateAxios.get("/tickets/countPendingTickets")
    .then((response)=>{
      setPendingTickets(response.data);
    })
    
  } catch (error) {
    console.log(error)
  }
}

//countResolvedTickets
const countResolvedTickets = () =>{
  try {
    privateAxios.get("/tickets/countResolvedTickets")
    .then((response)=>{
      setresolvedTicket(response.data);
    })
    
  } catch (error) {
    console.log(error)
  }
}
  let data;

  switch (type) {
    case "Unassigned":
      data = {
        title: "Unassigned",
        value: unassignedTickets,
        className: "Unassigned",
        valueClassName:'valueUnassigned'
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
  const listTickets = () =>{
    navigate( '/tickets-list')
  }
  return (
    <div className='summary'>
        <div className='summary_items'>
            <h5>{data.title}</h5> 
            <h2 className={data.valueClassName}>{data.value}</h2>
        </div>
        <div className='summary_items'>
            <MdIcons.MdArrowDropDownCircle />          
        </div>
    </div>
  )
}

export default Summary