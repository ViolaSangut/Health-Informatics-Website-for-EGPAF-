import './Facilities_Summary.css'

import React from 'react'

const Facilities_Summary = ({county}) => {

    let data;

    switch (county) {
      case "Homa_Bay":
        data = {
          title: "Homa Bay Facilities",
          value: 165,
          className: "Homa_Bay",
          valueClassName:'Homa_Bay'
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