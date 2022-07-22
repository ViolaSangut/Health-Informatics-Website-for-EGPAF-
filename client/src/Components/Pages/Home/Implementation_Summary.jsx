import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './Implementation_Summary.css'
import usePrivateAxios from '../../hooks/usePrivateAxios';
import axios from "axios";

const Implementation_Summary = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const privateAxios = usePrivateAxios();
  const [implementationSummary, setImplementationSummary] = useState('');


  //Implementation Summary
  const ImplementationSummaryStatus = () =>{
    try {
      axios.get("http://localhost:4000/facilities/summaryimplementation")
      .then((response)=>{

        //Stringifying response
        const resJson = JSON.stringify(response.data);
        
        //Removing square Brackets
        const resJsonObject = resJson.substring(1, resJson.length-1);
 
       //Converting response to Object
        const emrStatus = JSON.parse(resJsonObject);
        
        setImplementationSummary(emrStatus.ImplementationSummary)
   
      })
      
    } catch (error) {
      console.log(error)
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(()=>{
    ImplementationSummaryStatus();
  },[])

  return (
    <div className="implementationSummary" onClick={()=>{navigate("")}}>
       <p >Implementation Summary </p>
      <div className="implementationSummaryContent">
        <div className="summaryChart">
          { 
          implementationSummary !== null ?  (
          <CircularProgressbar 
          value={implementationSummary} 
          text={`${implementationSummary}%`} 
          strokeWidth={2} 
          />
          ): (
          <CircularProgressbar 
          value={implementationSummary} 
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