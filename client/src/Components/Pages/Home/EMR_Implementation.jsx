import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './Implementation_Summary.css'
import usePrivateAxios from '../../hooks/usePrivateAxios';
import axios from "axios";
const EMR_Implementation = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const privateAxios = usePrivateAxios();
  const [emrImplementation, setEmrImplementation] = useState('');


  //Implementation Summary
  const emrImplementationStatus = () =>{
    try {
      axios.get("http://localhost:4000/facilities/EMRImplementation")
      .then((response)=>{

        //Stringifying response
        const resJson = JSON.stringify(response.data);
        
        //Removing square Brackets
        const resJsonObject = resJson.substring(1, resJson.length-1);
 
       //Converting response to Object
        const emrStatus = JSON.parse(resJsonObject);
        console.log(emrStatus)
        
        setEmrImplementation(emrStatus.EMRImplementationPercentage)
   
      })
      
    } catch (error) {
      console.log(error)
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(()=>{
    emrImplementationStatus();
  },[])

  return (
    <div className="implementationSummary" onClick={()=>{navigate("")}}>
       <p >EMR Implementation </p>
      <div className="implementationSummaryContent">
        <div className="summaryChart">
          { 
          emrImplementation !== null ?  (
          <CircularProgressbar 
          value={emrImplementation} 
          text={`${emrImplementation}%`} 
          strokeWidth={2} 
          />
          ): (
          <CircularProgressbar 
          value={emrImplementation} 
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

export default EMR_Implementation