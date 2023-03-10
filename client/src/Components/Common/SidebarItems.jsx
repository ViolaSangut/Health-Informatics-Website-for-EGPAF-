import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import jwt_decode from "jwt-decode";

export const sidebarItems = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiOutlineHome />,
    className: "nav-text",
  },
  {
    title: "Facilities",
    path: "/facilities",
    icon: <FaIcons.FaHospitalAlt />,
    className: "nav-text",
  },
  {
    title: "Tickets",
    path: "/tickets",
    icon: <IoIcons.IoIosPaper />,
    className: "nav-text",
  },

  
];
