import './TicketsDashboard.css';
import Summary from './DashboardItems/Summary';

import Featured from './DashboardItems/Featured';
import Chart from './DashboardItems/Chart';
import { Link, useNavigate } from 'react-router-dom';

const TicketsDashboard = () => {

  const navigate = useNavigate();
  
  const totalTickets = () => {
    navigate('/tickets-list')
  }


  return (
    <div>
      <div >
      <Link to = '/tickets-list' className='btn btn-info' style={{marginLeft:"10%", marginTop:"1%"}}>Tickets</Link>
      <Link to = '/addticket' className='btn btn-info' style={{marginLeft:"2%", marginTop:"1%"}}>Add Ticket</Link>
      </div>
      
      <h5 className='pageTitle'>Tickets Dashboard</h5>
      <div className='summary1'>
        <Summary type = "Unassigned"/>
        <Summary type = "Pending"/>
        <Summary type = "Resolved"/>
        <Summary type = "Total" onClick ={()=>{totalTickets()}}/>
      </div>
      <div className="charts">
          <Featured/>
          <Chart/>
      </div>
    </div>
  )
}

export default TicketsDashboard