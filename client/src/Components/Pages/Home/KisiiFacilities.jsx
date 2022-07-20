import './Facilities_Summary.css'

import { useState, useEffect } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { useNavigate, useParams} from 'react-router-dom';


const KisiiFacilities = () => {

  const [KisiiFacilitiesCount, setKisiiFacilitiesCount] = useState('');
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();

  let id = useParams();

  id = 3

  useEffect(() => {
    //Counting Kisii Facilities 
      const kisiiFacilities= () =>{
        try {
          privateAxios.get("/facilities/countKisiiFacilities")
          .then((response)=>{
            setKisiiFacilitiesCount(response.data);
            console.log(response.data)
          })
          
        } catch (error) {
          console.log(error)
        }
      }
      kisiiFacilities();
  }, [])
    
  let data = {
    title: "Kisii Facilities",
    value: KisiiFacilitiesCount,
    className: "Kisii",
    valueClassName:'Kisii'
};    
    
return (

    <div className='facilitiesSummary'  onClick={()=>{navigate(`/facilities/${id}`)}}> 
        <div className='summaryItems'>
            <h5>{data.title}</h5> 
            <h2 className={data.valueClassName}>{data.value}</h2>
        </div>
        <div className='summaryItems'>
                
        </div>
    </div>
  )
}

export default KisiiFacilities