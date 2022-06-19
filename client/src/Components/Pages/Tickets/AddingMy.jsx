import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,

  BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Chart from 'chart.js/auto';

ChartJS.register(
  BarElement,
);



const BarChart = () => {
  const [chart, setChart] = useState({})

  const [weeklyTicketsCounts, setweeklyTicketsCounts] = useState([]);
const [weekDays, setweekDays] = useState([]);
const [weekDate, setweekDate] = useState([]);
const [ticketsCount, setTicketsCount] = useState([]);

  const countAllTickets = () =>{
    try {
      axios.get("http://localhost:4000/tickets/getNoOfWeeklyTickets")
      .then((response)=>{
        console.log(response.data);
        setChart(response.data)

        const data1 = (response.data)
        setweekDays(data1.map(x => x.Day));
        setweekDate(data1.map(x => x.createdAt));
        setTicketsCount(data1.map(x => x.Tickets));


        
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    countAllTickets();
  }, [])

 
  const data = {
    labels: weekDays,
    datasets: [{
      label: `${chart ?.length} No. of Tickets`,
      data: ticketsCount,
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      // borderColor: "black",
      borderWidth: 2,
    }]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Bar
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default BarChart
