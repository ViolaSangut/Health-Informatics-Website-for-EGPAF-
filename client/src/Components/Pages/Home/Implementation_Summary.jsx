import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './Implementation_Summary.css'

const Implementation_Summary = () => {
  return (
    <div className="implementationSummary">
      
      <div className="implementationSummaryContent">
      <p >Implementation Summary </p>
        
        <div className="summryChart">
          { 
          40 !== null ?  (
          <CircularProgressbar 
          value={40} 
          text={`${40}%`} 
          strokeWidth={2} 
          />
          ): (
          <CircularProgressbar 
          value={40} 
          text={`${0}%`}  
          strokeWidth={2} 
          />
          )
          }
        </div>
      
      </div>
    </div>
  )
}

export default Implementation_Summary