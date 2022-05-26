import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Tickets from './Components/Pages/Tickets/Tickets';
import SidebarComponent from './Components/Common/Sidebar';
import AddTicket from './Components/Pages/Tickets/AddTicket';
import Login from './Components/Pages/Users/Login';
import Facilities from './Components/Pages/Facilities/Facilities';
import Inventory from './Components/Pages/Inventory/Inventory';
import TicketsDashboard from './Components/Pages/Tickets/TicketsDashboard';


const SidebarLayout = () => (
  <>
    <SidebarComponent />
    <Outlet />
  </>
);


function App() {
  return (
    <div>
      <Router>       
        <Routes>
        
          <Route  element = {<SidebarLayout/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/facilities' element={<Facilities/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/tickets' element={<TicketsDashboard/>}/>
          </Route>
            <Route path='/' element={<Login/>}/>
        </Routes>
     </Router>
    </div>
  );
}

export default App;
