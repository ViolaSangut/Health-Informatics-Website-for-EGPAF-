import React from 'react'
import './TodaysResolved.css';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import usePrivateAxios from '../../../hooks/usePrivateAxios';

const TodaysResolved = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const privateAxios = usePrivateAxios();
  const [todaysTicket, setTodaysTicket] = useState('');
  const [todaysResolvedTicket, setTodaysResolvedTicket] = useState('');
  const [percentageCountOfTodaysResolvedTickets, setpercentageCountOfTodaysResolvedTickets] = useState('');

  useEffect(() => {
    countTodaysTickets();
    countTodaysResolvedTickets();
    percentageOfTodaysResolvedTickets();
  }, [])
  

  //countTodaysTickets
  const countTodaysTickets = () =>{
    try {
      privateAxios.get("/tickets/countTodaysTickets")
      .then((response)=>{
        const todaysTicketsJson = JSON.stringify(response.data);
        //Removing square Brackets
        const todaysTicketsObject = todaysTicketsJson.substring(1, todaysTicketsJson.length-1);
       
        const todaysTickets = JSON.parse(todaysTicketsObject);
        
        setTodaysTicket(todaysTickets.todays_tickets)
   
      })
      
    } catch (error) {
      console.log(error)
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  //countTodaysResolvedTickets
  const countTodaysResolvedTickets = () =>{
    try {
      privateAxios.get("/tickets/countTodaysResolvedTickets")
      .then((response)=>{
        const todaysResolvedTicketsJson = JSON.stringify(response.data);
        //Removing square Brackets
        const todaysTicketsObject = todaysResolvedTicketsJson.substring(1, todaysResolvedTicketsJson.length-1);
    
        const todaysResolvedTickets = JSON.parse(todaysTicketsObject);

        setTodaysResolvedTicket(todaysResolvedTickets.todays_resolved_tickets)

      })
     
    } catch (error) {
      console.log(error)
      navigate('/', { state: { from: location }, replace: true });
    }
  }

   //percentageCountOfTodaysResolvedTickets
   const percentageOfTodaysResolvedTickets = () =>{
    try {
      privateAxios.get("/tickets/percentageCountOfTodaysResolvedTickets")
      .then((response)=>{
        const rateOfTodaysResolvedTicketsJson = JSON.stringify(response.data);

        //Removing square Brackets
        const rateOfTodaysResolvedTicketsObject = rateOfTodaysResolvedTicketsJson.substring(1, rateOfTodaysResolvedTicketsJson.length-1);
        
        const rateOfTodaysResolvedTickets = JSON.parse(rateOfTodaysResolvedTicketsObject)

        setpercentageCountOfTodaysResolvedTickets(rateOfTodaysResolvedTickets.percentageCountOfTodaysResolvedTickets);    
      })
     
    } catch (error) {
      console.log(error)
      navigate('/', { state: { from: location }, replace: true });
    }
  }


  return (
    <div className="todaysResolved">
      
      <div className="todaysResolvedContent">
      <p >Percentage of today's resolved ticket(s) </p>
        
        <div className="circleChart">
          { 
          percentageCountOfTodaysResolvedTickets !== null ?  (
          <CircularProgressbar 
          value={percentageCountOfTodaysResolvedTickets} 
          text={`${percentageCountOfTodaysResolvedTickets}%`} 
          strokeWidth={2} 
          />
          ): (
          <CircularProgressbar 
          value={percentageCountOfTodaysResolvedTickets} 
          text={`${0}%`}  
          strokeWidth={2} 
          />
          )
          }
        </div>
        <p >Total ticket(s) resolved today</p>
        <p className="amount">{todaysResolvedTicket}</p>
      </div>
    </div>
  )
}

export default TodaysResolved