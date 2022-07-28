import './TicketsDashboard.css';
import Summary from './DashboardItems/Summary';

import TodaysResolved from './DashboardItems/TodaysResolved';
import WeeklyTicketsDashboard from './DashboardItems/WeeklyTicketsDashboard';
import { Link, useNavigate } from 'react-router-dom';

const TicketsDashboard = () => {

  const navigate = useNavigate();



  const goToTicketList = () => {
    navigate(`/tickets-list`)
  }

  const goAddTicket = () => {
    navigate(`/addticket`)
  }

  return (
    <div className='container'>
      <h3 className='pageTitle fw-bold mt-3 mb-3'>Tickets Dashboard</h3>

      <div className='form-group row mt-2 mb-2'>
        <div className='col-sm-4'>
      <button onClick={goToTicketList} className=' listof btn btn-outline-success mt-2'>List of Tickets</button>
      </div>
      <div className='col-md-4 offset-4'>
      <button onClick={goAddTicket} className='btn btn-outline-warning mt-2' >Add New Ticket</button>
      </div>
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