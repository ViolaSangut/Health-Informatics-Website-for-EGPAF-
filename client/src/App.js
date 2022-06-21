import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Tickets from "./Components/Pages/Tickets/Tickets";
import SidebarComponent from "./Components/Common/Sidebar";
import Login from "./Components/Pages/Users/Login";
import Facilities from "./Components/Pages/Facilities/Facilities";
import Inventory from "./Components/Pages/Inventory/Inventory";
import TicketsDashboard from "./Components/Pages/Tickets/TicketsDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./Components/Common/PageNotFound";
import Users from "./Components/Pages/Users/Users";
import RegisterComponent from "./Components/Pages/Users/Register";
import AddTicketComponent from "./Components/Pages/Tickets/AddTicket";
import AddingMy from "./Components/Pages/Tickets/AddingMy";
import AddInventory from "./Components/Pages/Inventory/AddInventory";
import AddSimcards from "./Components/Pages/Inventory/AddSimcard";
import Simcards from "./Components/Pages/Inventory/Simcards";

const SidebarLayout = () => (
  <>
    <SidebarComponent />
    <Outlet />
  </>
);

function App() {
  return (
    <div>
      <>
        <ToastContainer position="top-center" />
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/tickets" element={<TicketsDashboard />} />
            <Route path="/add-user" element={<RegisterComponent />} />
            <Route path="/list-user" element={<Users />} />
            <Route path="/edit-user/:id" element={<RegisterComponent />} />

            <Route path="/addticket" element={<AddTicketComponent />} />
            <Route path="/edit-ticket/:id" element={<AddTicketComponent />} />
            <Route path="/tickets-list" element={<Tickets />} />
            <Route path="/test" element={<AddingMy />} />
            <Route path="/AddInventory" element={<AddInventory />} />
            <Route path="/UpdateInventory/:id" element={<AddInventory />} />
            <Route path="/AddSimcards" element={<AddSimcards />} />
            <Route path="/AddSimcards/:id" element={<AddSimcards />} />
            <Route path="/simcards" element={<Simcards />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
