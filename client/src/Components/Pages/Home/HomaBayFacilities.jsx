import './Facilities_Summary.css'

import { useState, useEffect } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { useNavigate, useParams } from 'react-router-dom';


const HomaBayFacilities = () => {

  const [homaBayFacilitiesCount, setHomaBayFacilitiesCount] = useState('');
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();
  let id = useParams();
  id = 1

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
    
  let data = {
       title: "Homa Bay Facilities",
       value: homaBayFacilitiesCount,
       className: "homaBay",
       valueClassName:'homaBay'
     };    
    
return (

    <div className='facilitiesSummary' onClick={()=>{navigate(`/facilities/${id}`)}}> 
        <div className='summaryItems'>
            <h5>{data.title}</h5> 
            <h2 className={data.valueClassName}>{data.value}</h2>
        </div>
        <div className='summaryItems'>
                
        </div>
    </div>
  )
}

export default HomaBayFacilities