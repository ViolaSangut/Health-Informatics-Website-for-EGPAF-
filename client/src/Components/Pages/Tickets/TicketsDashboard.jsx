import './TicketsDashboard.css';
import Summary from './DashboardItems/Summary';

import TodaysResolved from './DashboardItems/TodaysResolved';
import WeeklyTicketsDashboard from './DashboardItems/WeeklyTicketsDashboard';
import { Link, useNavigate } from 'react-router-dom';
import ResolvedTickets from './DashboardItems/ResolvedTickets';

const TicketsDashboard = () => {

  const navigate = useNavigate();

  

  return (
    <div>
      <div >
      <Link to = '/tickets-list' className='btn btn-info' style={{marginLeft:"10%", marginTop:"1%"}}>Tickets</Link>
      <Link to = '/addticket' className='btn btn-info' style={{marginLeft:"2%", marginTop:"1%"}}>Add Ticket</Link>
      
      <h4 className='pageTitle'>Tickets Dashboard</h4>
      </div>
      <div className='summary1'>
        <Summary type = "Unassigned"/>
        <Summary type = "Pending"/>
        <Summary type = "Resolved"/>
        <Summary type = "Total"/>
      </div>
      <div className="charts">
          <WeeklyTicketsDashboard/>
          <TodaysResolved/>
      </div>
    </div>
  )
}

export default TicketsDashboard