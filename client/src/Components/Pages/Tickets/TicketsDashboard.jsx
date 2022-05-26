import Widgets from './Widgets'
import './TicketsDashboard.css';

const TicketsDashboard = () => {
  return (
    
    <div className='tickets'>
      <h2 className='title'>Tickets Dashboard</h2>
        <div className='widgets'>
            <Widgets/>
            <Widgets/>
            <Widgets/>
            <Widgets/>  
        </div>

    </div>
  )
}

export default TicketsDashboard