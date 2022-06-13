import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';  
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';



export const sidebarItems = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiOutlineHome/>,
        className: 'nav-text',
    },
    {
        title: 'Facilities',
        path: '/facilities',
        icon: <FaIcons.FaHospitalAlt/>,
        className: 'nav-text',
    },
    {
        title: 'Inventory',
        path: '/inventory',
        icon: <MdIcons.MdOutlineInventory2/>,
        className: 'nav-text',
    },

    {
        title: 'Tickets',
        path: '/tickets',
        icon: <IoIcons.IoIosPaper />,
        className: 'nav-text',
    },

    {
        title: 'Users',
        path: '/list-user',
        icon: <MdIcons.MdPeople />,
        className: 'nav-text',
    },
]