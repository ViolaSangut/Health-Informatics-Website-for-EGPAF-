import './Facilities_Summary.css'

import { useState, useEffect } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { useNavigate } from 'react-router-dom';


const Facilities_Summary = ({county}) => {

  const [homaBayFacilitiesCount, setHomaBayFacilitiesCount] = useState('');
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();

  useEffect(() => {
    //counting Homa Bay Facilities
      const countHomaBayFacilities= () =>{
        try {
          privateAxios.get("/facilities/countHomaBayFacilities")
          .then((response)=>{
            setHomaBayFacilitiesCount(response.data);
            console.log(response.data)
          })
          
        } catch (error) {
          console.log(error)
        }
      }
      countHomaBayFacilities();
  }, [])

    let data;

    switch (county) {
      case "Homa_Bay":
        data = {
          title: "Homa Bay Facilities",
          value: homaBayFacilitiesCount,
          className: "homaBay",
          valueClassName:'homaBay'
        };    
      break;
  
      case "Kisii":
        data = {
          title: "Kisii Facilities",
          value: 32,
          className: "Kisii",
          valueClassName:'Kisii'
        };    
      break;
  
      case "Kiambu":
        data = {
          title: "Kiambu Facilities",
          value: 32,
          className: "Kiambu",
          valueClassName:'Kiambu'
        };    
      break;
    
      default:
        break;
    }


return (

    <div className='facilitiesSummary'>
     
        <div className='summaryItems'>
            <h5>{data.title}</h5> 
            <h2 className={data.valueClassName}>{data.value}</h2>
        </div>
        <div className='summaryItems'>
                
        </div>
    </div>
  )
}

export default Facilities_Summary