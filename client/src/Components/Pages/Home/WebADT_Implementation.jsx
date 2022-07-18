import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './Implementation_Summary.css'
import usePrivateAxios from '../../hooks/usePrivateAxios';
import axios from "axios";

const WebADT_Implementation = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const privateAxios = usePrivateAxios();
  const [adtImplementation, setAdtImplementation] = useState('');


  //Implementation Summary
  const adtImplementationStatus = () =>{
    try {
      axios.get("http://localhost:4000/facilities/ADTImplementation")
      .then((response)=>{

        //Stringifying response
        const resJson = JSON.stringify(response.data);
        
        //Removing square Brackets
        const resJsonObject = resJson.substring(1, resJson.length-1);
 
       //Converting response to Object
        const adtStatus = JSON.parse(resJsonObject);   
        setAdtImplementation(adtStatus.ADTImplementationPercentage)
   
      })
      
    } catch (error) {
      console.log(error)
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(()=>{
    adtImplementationStatus();
 
  },[])


  return (
    <div className="implementationSummary" onClick={()=>{navigate("")}}>
       <p >Web ADT Implementation </p>
      <div className="implementationSummaryContent">
        <div className="summaryChart">
          { 
          adtImplementation !== null ?  (
          <CircularProgressbar 
          value={adtImplementation} 
          text={`${adtImplementation}%`} 
          strokeWidth={2} 
          />
          ): (
          <CircularProgressbar 
          value={adtImplementation} 
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

export default WebADT_Implementation