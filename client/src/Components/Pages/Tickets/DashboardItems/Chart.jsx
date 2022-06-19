import { useState, useEffect } from 'react';
import axios from 'axios';
import './Chart.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = () => {


  const week_day = [];
  const ticket_count = [];

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

      const weeklyTicketsObject = weeklyTicketsJson.substring(1, weeklyTicketsJson.length-1);

      console.log(weeklyTicketsObject)

     const weeklyTickets = JSON.parse(weeklyTicketsJson);
     console.log(weeklyTickets)
     setweeklyTicketsCounts(weeklyTickets);



     const data1 = weeklyTickets
     setweekDays(data1.map(item => item.Day));
     setTicketsCount(data1.map(item => item.noOfTickets));

     console.log(weekDays)
     console.log(ticketsCount)

  

    for (const dataObj of response.data) {
      week_day.push((dataObj.Day));
      ticket_count.push(parseInt(dataObj.noOfTickets));

      console.log(ticket_count)
      
      if (week_day === "Sat") {
        console.log(ticket_count)
       }

    }
  
    console.log(week_day, ticket_count)

    
    
      
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
 
  
];
// const data = [weeklyTicketsCounts]





  const data = [
    {
      name: 'Mon',
      tickets: 8,
    },
    {
      name: 'Tue',
      tickets: 3,
    },
    {
      name: 'Wed',
      tickets: 6,
    },
    {
      name: 'Thur',
      tickets: 11,
    },
    {
      name: 'Fri',
      tickets: 5,
    },
    {
      name: 'Sat',
      tickets: 4,
    },
    {
      name: 'Sun',
      tickets: 2,
    },
    
  ];
  return (
    <div className='chart'>
      <div className="title">Weekly Tickets History</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data2={data2}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tickets" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart