import './TicketsDashboard.css';
import Summary from './DashboardItems/Summary';

import TodaysResolved from './DashboardItems/TodaysResolved';
import WeeklyTicketsDashboard from './DashboardItems/WeeklyTicketsDashboard';
import { Link, useNavigate } from 'react-router-dom';

const TicketsDashboard = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div >
      <Link to = '/tickets-list' className='btn btn-info' style={{marginLeft:"10%", marginTop:"1%"}}>Tickets</Link>
      <Link to = '/addticket' className='btn btn-info' style={{marginLeft:"2%", marginTop:"1%"}}>Add Ticket</Link>
      </div>
      
      <h5 className='pageTitle'>Tickets Dashboard</h5>
      <div className='summary1' onClick ={()=>navigate('/tickets-list')}>
        <Summary type = "Unassigned"/>
        <Summary type = "Pending"/>
        <Summary type = "Resolved"/>
        <Summary type = "Total"/>
      </div>
      <div className="charts">
          <TodaysResolved/>
          <WeeklyTicketsDashboard/>
      </div>
    </div>
  )
}

export default TicketsDashboard