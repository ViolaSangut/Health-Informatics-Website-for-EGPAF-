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
import AddFacilityComponent from "./Components/Pages/Facilities/AddFacilities";
import SpecificFacilityComponent from "./Components/Pages/Facilities/specificFacility";
import Test from "./Components/Pages/Tickets/Test";
import AddInventory from "./Components/Pages/Inventory/AddInventory";
import AddSimcards from "./Components/Pages/Inventory/AddSimcard";
import Simcards from "./Components/Pages/Inventory/Simcards";
import CheckAuth from "./Components/context/CheckAuth";
import Unauthorized from "./Components/Common/Unauthorized";
import InventoryMain from "./Components/Pages/Inventory/InventoryMain";
import PersistLogin from "./Components/hooks/PersistLogin";

const SidebarLayout = () => (
  <>
    <SidebarComponent />
    <Outlet />
  </>
);

function App() {
  return (
    <div>
        <ToastContainer position="top-center" />
        <Routes>
          <Route element={<PersistLogin />}>
            <Route element={<SidebarLayout />}>
              {/* Home */}
              <Route element={<CheckAuth allowedRoles={[1, 2, 3, 4]} />}>
                <Route path="/home" element={<Home />} />
              </Route>

              {/* User Management - accessed by only Admin and Super_User */}
              <Route element={<CheckAuth allowedRoles={[3, 4]} />}>
                <Route path="/list-user" element={<Users />} />
                <Route path="/edit-user/:id" element={<RegisterComponent />} />
              </Route>

              {/* Facilities */}
              <Route element={<CheckAuth allowedRoles={[1, 2, 3, 4]} />}>
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/facilities/:id" element={<Facilities />} />
                <Route path="/addfacility" element={<AddFacilityComponent />} />
              </Route>

              {/* Tickets */}
              <Route element={<CheckAuth allowedRoles={[1, 2, 3, 4]} />}>
                <Route path="/tickets" element={<TicketsDashboard />} />
                <Route path="/addticket" element={<AddTicketComponent />} />
                <Route
                  path="/edit-ticket/:id"
                  element={<AddTicketComponent/>}
                />
                <Route path="/tickets-list" element={<Tickets />} />
                <Route path="/tickets-list/:id" element={<Tickets />} />
              </Route>

              {/* Inventory */}
              <Route element={<CheckAuth allowedRoles={[1, 2, 3, 4]} />}>
                <Route path="/inventory" element={<InventoryMain />} />
                <Route path="/AddInventory" element={<AddInventory />} />
                <Route path="/UpdateInventory/:id" element={<AddInventory />} />
                <Route path="/AddSimcards" element={<AddSimcards />} />
                <Route path="/AddSimcards/:id" element={<AddSimcards />} />
                <Route path="/simcards" element={<Simcards />} />
              </Route>
            </Route>
          </Route>
          <Route path="/add-user" element={<RegisterComponent />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/sim" element={<Simcards />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;
