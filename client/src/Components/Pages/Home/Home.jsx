import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import WeeklyTicketsDashboard from '../Tickets/DashboardItems/WeeklyTicketsDashboard';
import Implementation_Summary from './Implementation_Summary';
import UseAuth from "../../context/UseAuth";
import InventorySummary from './InventorySummary';
import HomaBayFacilities from './HomaBayFacilities';
import KisiiFacilities from './KisiiFacilities';
import KiambuFacilities from './KiambuFacilities';
import EMR_Implementation from './EMR_Implementation';
import WebADT_Implementation from './WebADT_Implementation';

const Home = () => {
  const navigate = useNavigate();
  const { auth } = UseAuth();
  
  return (
    <div className='home'>
      
      <div className='homeContainer'>

        <div className='facilities_summary'>
          <HomaBayFacilities/>
          <KisiiFacilities/>
          <KiambuFacilities/>
        
        
        </div>
        <div className='homeCharts'>

          <div className='ticketsChart'>
            <WeeklyTicketsDashboard/>
          </div>

          <div className='Implementation_Summary'>
            <Implementation_Summary />
            <EMR_Implementation />
            <WebADT_Implementation />
          </div>
       
        </div>
        <InventorySummary/>
        
        
      </div>
    
      
    </div>
  )
}

export default Home