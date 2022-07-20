import './Facilities_Summary.css'

import { useState, useEffect } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { useNavigate, useParams } from 'react-router-dom';


const KiambuFacilities = () => {

  const [kiambuFacilitiesCount, setKiambuFacilitiesCount] = useState('');
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();
  let id = useParams();

  id = 2


  useEffect(() => {
    //Counting Kiambu Facilities 
      const KiambuFacilities= () =>{
        try {
          privateAxios.get("/facilities/countKiambuFacilities")
          .then((response)=>{
            setKiambuFacilitiesCount(response.data);
            console.log(response.data)
          })
          
        } catch (error) {
          console.log(error)
        }
      }
      KiambuFacilities();
  }, [])
    
  let data = {
    title: "Kiambu Facilities",
    value: kiambuFacilitiesCount,
    className: "Kiambu",
    valueClassName:'Kiambu'
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

export default KiambuFacilities