import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';  
import * as AIIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { sidebarItems } from './SidebarItems';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import egpaf_logo from '../../Resources/Images/egpaf_logov2.JPG'
import * as MdIcons from 'react-icons/md';
import axios from 'axios';
import UseAuth from '../context/UseAuth';
import jwt_decode from "jwt-decode";

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



    //Logout
    const logout = async () => {
        setAuth({});
        try {
          await axios.delete("http://localhost:4000/users/logout", {
            withCredentials: true
          });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };

  return (
      <>
      <IconContext.Provider value={{color: 'white'}}>
      <div className='sidebar'>
       <div>
           <Link to = '#' className='menu-bars'>
               <FaIcons.FaBars onClick={showSideBar}/>
           </Link>
       </div>
       <h2 className='mainTitle'>Health Information System</h2>       
       {/* Logo */}
       <div >
          <img className='logo1' src={egpaf_logo} alt=''/>
       </div>
       {/* Account */}
       
       < MdIcons.MdAccountCircle className='account' />
       <h4 className='name'> Hi, {usersFirstName} {usersLastName} </h4>
       
       {/* Logout */}
       <AIIcons.AiOutlineLogout className='logout' />
       <h5 onClick={logout} className='name'>Log Out</h5>
       
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
           </ul>

       </nav>
      </div>
      </IconContext.Provider>
      </>
    
  )
}

export default SidebarComponent