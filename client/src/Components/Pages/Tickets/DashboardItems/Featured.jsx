import React from 'react'
import './Featured.css';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from 'react';
import axios from 'axios';


const Featured = () => {

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
      axios.get("http://localhost:4000/tickets/countTodaysTickets")
      .then((response)=>{
        console.log(response.data)
        const todaysTicketsJson = JSON.stringify(response.data);
        //Removing square Brackets
        const todaysTicketsObject = todaysTicketsJson.substring(1, todaysTicketsJson.length-1);
        console.log(todaysTicketsObject);

        const todaysTickets = JSON.parse(todaysTicketsObject);
        console.log(todaysTickets.todays_tickets)
        
        setTodaysTicket(todaysTickets.todays_tickets)
        console.log(todaysTicket);

      
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  //countTodaysResolvedTickets
  const countTodaysResolvedTickets = () =>{
    try {
      axios.get("http://localhost:4000/tickets/countTodaysResolvedTickets")
      .then((response)=>{
        const todaysResolvedTicketsJson = JSON.stringify(response.data);
        //Removing square Brackets
        const todaysTicketsObject = todaysResolvedTicketsJson.substring(1, todaysResolvedTicketsJson.length-1);
    
        const todaysResolvedTickets = JSON.parse(todaysTicketsObject);
        console.log(todaysResolvedTickets.todays_resolved_tickets)

        setTodaysResolvedTicket(todaysResolvedTickets.todays_resolved_tickets)
        console.log(todaysResolvedTicket);
  
      })
     
    } catch (error) {
      console.log(error)
    }
  }

   //percentageCountOfTodaysResolvedTickets
   const percentageOfTodaysResolvedTickets = () =>{
    try {
      axios.get("http://localhost:4000/tickets/percentageCountOfTodaysResolvedTickets")
      .then((response)=>{
        const rateOfTodaysResolvedTicketsJson = JSON.stringify(response.data);
        console.log(rateOfTodaysResolvedTicketsJson)

        //Removing square Brackets
        const rateOfTodaysResolvedTicketsObject = rateOfTodaysResolvedTicketsJson.substring(1, rateOfTodaysResolvedTicketsJson.length-1);
        console.log(rateOfTodaysResolvedTicketsObject)
        
        const rateOfTodaysResolvedTickets = JSON.parse(rateOfTodaysResolvedTicketsObject)
        console.log(rateOfTodaysResolvedTickets.percentageCountOfTodaysResolvedTickets);

        setpercentageCountOfTodaysResolvedTickets(rateOfTodaysResolvedTickets.percentageCountOfTodaysResolvedTickets);

        
      })
     
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="featured">
      
      <div className="bottom">
      <p >Percentage of today's resolved ticket(s) </p>
        
        <div className="featuredChart">
          <CircularProgressbar value={percentageCountOfTodaysResolvedTickets} text={`${percentageCountOfTodaysResolvedTickets}%`} strokeWidth={2} />
        </div>
        <p >Total ticket(s) resolved today</p>
        <p className="amount">{todaysResolvedTicket}</p>
      </div>
    </div>
  )
}

export default Featured