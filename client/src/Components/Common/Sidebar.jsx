import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';  
import * as AIIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { sidebarItems } from './SidebarItems';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import egpaf_logo from '../../Resources/Images/logonew2.png'
import * as MdIcons from 'react-icons/md';
import axios from 'axios';
import UseAuth from '../context/UseAuth';
import jwt_decode from "jwt-decode";
import { NavDropdown } from 'react-bootstrap';

const SidebarComponent = ({ items }) => {
    const [sidebar, setSidebar] = useState(false);

    const showSideBar = () => setSidebar(!sidebar);
    const navigate = useNavigate();
    const { setAuth, auth } = UseAuth();

    //Getting loggedin's user firstName & lastName from accessToken.
    const decodedAccessToken = auth?.accessToken
          ? jwt_decode(auth.accessToken)
          : undefined

    const usersFirstName = decodedAccessToken?.firstName || [];
    const usersLastName = decodedAccessToken?.lastName || [];
    const loggedInUserId = decodedAccessToken?.id || null;

    const UserRoles = decodedAccessToken?.roles || null;
    const loggedinUserRoles = UserRoles?.toString();



    //Logout
    const logout = async () => {
        setAuth({});
        localStorage.removeItem("loggedInCheck");
        try {
          await axios.delete("http://localhost:4000/users/logout", {
            withCredentials: true
          });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };

      //Profile
      const userProfile = () => {
         navigate(`user-profile/${loggedInUserId}`)
      };

  return (
      <div > 
      <IconContext.Provider value={{color: 'white'}}>
      <div className='sidebar'>
       <div>
           <Link to = '#' className='menu-bars'>
               <FaIcons.FaBars onClick={showSideBar}/>
           </Link>
       </div>
       {/* Logo */}
       <div >
          <img className='logo1' src={egpaf_logo} alt=''/>
       </div>

       <h2 className='mainTitle fw-bold'>Health Information System</h2>       

     
       {/* Account */}
        <NavDropdown 
        className='account' title= {< MdIcons.MdAccountCircle className='accountIcon' />} 
        > 
            <NavDropdown.Item>
                <h4 className='name'> Hi, {usersFirstName} {usersLastName} </h4>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={userProfile}>Profile</NavDropdown.Item >
            <NavDropdown.Item onClick={logout} >
                Logout <AIIcons.AiOutlineLogout className='logout' />
            </NavDropdown.Item>
        </NavDropdown>
       
       
       <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
           <ul className='nav-menu-items' onClick={showSideBar} >
               <li className="navbar-toggle">
                    <Link to='#' className='menu-bars'>
                        <AIIcons.AiOutlineCloseSquare/>
                    </Link>
               </li>

                         
               {
                   sidebarItems.map((item, index)=>{
                       return (
                           <li key = {index} className = {item.className}>
                              <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                              </Link>
                              
                           </li>
                       );
                   })
               }
               
                {/* Admin Panel */}
                {  loggedinUserRoles === "3" || loggedinUserRoles === "4" &&
          
                <>
                {/* Inventory */}
                <li className='nav-text'>
                   <Link to="/inventory">
                    <MdIcons.MdOutlineInventory2 />
                    <span>Inventory</span> 
                    </Link>
                 </li>
                 {/* Users */}
                 <li className='nav-text'>
                   <Link to="/list-user">
                   < MdIcons.MdAdminPanelSettings/>
                    <span>Admin</span> 
                    </Link>
                 </li>
                </>
                    
               }
           </ul>

       </nav>
      </div>
      </IconContext.Provider>
      </div>
    
  )
}

export default SidebarComponent