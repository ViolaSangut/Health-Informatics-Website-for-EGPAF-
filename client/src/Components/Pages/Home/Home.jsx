import React, {useEffect} from 'react'
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import WeeklyTicketsDashboard from '../Tickets/DashboardItems/WeeklyTicketsDashboard';
import Facilities_Summary from './Facilities_Summary';
import TodaysResolved from '../Tickets/DashboardItems/TodaysResolved';
import Implementation_Summary from './Implementation_Summary';
<<<<<<< HEAD
import InventorySummary from './InventorySummary';
=======
import UseAuth from "../../context/UseAuth";

>>>>>>> af5db509e3db81d931a481e7ac49026c604ee37b

const Home = () => {
  const navigate = useNavigate();
  const { auth } = UseAuth();

 
  return (
    <div className='home'>
      <div className='homeContainer'>

        <div className='facilities_summary'  onClick={()=>navigate("/facilities")}>
          <Facilities_Summary county= "Homa_Bay"/>
          <Facilities_Summary county= "Kisii" />
          <Facilities_Summary county= "Kiambu"/>
          <Implementation_Summary/>
        
        </div>
        
          <InventorySummary/>


      </div>
    
      
    </div>
  )
}

export default Home