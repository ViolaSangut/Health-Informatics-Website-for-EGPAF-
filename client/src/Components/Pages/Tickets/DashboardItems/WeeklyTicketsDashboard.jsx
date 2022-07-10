import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,

  BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './WeeklyTicketsDashboard.css';
import { useNavigate, useLocation} from 'react-router-dom';
import usePrivateAxios from '../../../hooks/usePrivateAxios';

ChartJS.register(
  BarElement,
);



const WeeklyTicketsDashboard = () => {
  const [chart, setChart] = useState({})

  const [weeklyTicketsCounts, setweeklyTicketsCounts] = useState([]);
  const [weekDays, setweekDays] = useState([]);
  const [weekDate, setweekDate] = useState([]);
  const [ticketsCount, setTicketsCount] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const privateAxios = usePrivateAxios();

  const countWeeklyTickets = () =>{
    try {
      privateAxios.get("/tickets/getNoOfWeeklyTickets")
      .then((response)=>{
        console.log(response.data);
        setChart(response.data)

        const noOfWeeklyTickets = (response.data)
        setweekDays(noOfWeeklyTickets.map(Tickets => Tickets.Day));
        setweekDate(noOfWeeklyTickets.map(Tickets => Tickets.createdAt));
        setTicketsCount(noOfWeeklyTickets.map(dailyCount => dailyCount.Tickets));
    
      })
      
    } catch (error) {
      console.log(error)
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(()=>{
    countWeeklyTickets();
  }, [])

 
  const data = {
    labels: weekDays,
    datasets: [{
      label: `No. of Tickets`,
      data: ticketsCount,
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
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

  let dashboardTitle = <h5 className='dashboardTitle'>Weekly Tickets History</h5>

  return (
    <div className='chart'>
     { dashboardTitle}
    <div >
      <></>
      <Bar
        data={data}
        height={300}
        options={options}

      />
    </div>
    </div>
  )
}

export default WeeklyTicketsDashboard
