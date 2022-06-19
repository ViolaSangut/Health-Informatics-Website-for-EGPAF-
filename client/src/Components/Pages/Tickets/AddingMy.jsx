import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';



const AddingMy = () => {
  
const [weeklyTicketsCounts, setweeklyTicketsCounts] = useState([]);
const [weekDays, setweekDays] = useState([]);
const [ticketsCount, setTicketsCount] = useState([]);


useEffect(() => {

  countAllTickets();
 
}, [])






//Count of Tickets within a week
const countAllTickets = () =>{
  try {
    axios.get("http://localhost:4000/tickets/getNoOfWeeklyTickets")
    .then((response)=>{
      console.log(response.data);
      // setweeklyTicketsCounts(response.data);

      const weeklyTicketsJson = JSON.stringify(response.data);
      console.log(weeklyTicketsJson)
      // setweeklyTicketsCounts(weeklyTicketsJson)

      const weeklyTicketsObject = weeklyTicketsJson.substring(1, weeklyTicketsJson.length-1);

      console.log(weeklyTicketsObject)
      // setweeklyTicketsCounts(weeklyTicketsObject)
     const weeklyTickets = JSON.parse(weeklyTicketsJson);
     console.log(weeklyTickets)
     setweeklyTicketsCounts(weeklyTickets);

    //  setweekDays(response.data)
    //  console.log(response.data[1])

     const data1 = (response.data)
     setweekDays(data1.map(item => item.Day));
     setTicketsCount(data1.map(item => item.noOfTickets));

     console.log(weekDays)
     console.log(ticketsCount)
    //  alert(ticketsCount)
    
      
    })
    
  } catch (error) {
    console.log(error)
  }
}


const data2 = [
  {
    name: weekDays,
    tickets: ticketsCount,
  },
]

const data = [
  {
    name: 'Page A',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    pv: 3908,
    // amt: 2000,
  },
  {
    name: 'Page E',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    pv: 4300,
    amt: 2100,
  },
];

  return (
    <div>
      <h3>Test</h3>

      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient> */}
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </div>
  )
}

export default AddingMy