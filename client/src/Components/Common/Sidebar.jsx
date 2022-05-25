import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';  
import * as AIIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { sidebarItems } from './SidebarItems';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import * as RiIcons from 'react-icons/ri';


const SidebarComponent = ({ items }) => {
    const [sidebar, setSidebar] = useState(false);

    const showSideBar = () => setSidebar(!sidebar);

  return (
      <>
      <IconContext.Provider value={{color: 'white'}}>
      <div className='sidebar'>
       <div>
           <Link to = '#' className='menu-bars'>
               <FaIcons.FaBars onClick={showSideBar}/>
           </Link>
       </div>
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