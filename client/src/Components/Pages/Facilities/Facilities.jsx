
import React, { useState, useEffect } from "react" ;

import "./Facilities.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify' ;


const Facilities = () => {

  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();
  const [searchFacilities, setSearchFacilities] = useState("");

  useEffect(() => {   
    getAllFacilities();
  }, [])

  const getAllFacilities = () =>{
    axios.get("http://localhost:4000/facilities")
    .then((response)=>{
        console.log(response.data)
        setFacilities(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })}

    //delete facility
    const deleteFacility = (id) =>{
      if(window.confirm("Are you sure you want to delete this facility?")){
          axios.delete(`http://localhost:4000/facilities/delete/${id}`)
      .then((response)=>{
          setFacilities(facilities.filter((facility)=>{
              return facility.id !== id;
          }));
          toast.success("facility deleted successfully");
          console.log(response);
      })
      .catch((error)=>{
          console.log(error);
      });
      }
      
  };

return (
  
  <div style={{textAlign: "center"}}>
  <h2 className='text-center'>facilities</h2>  

  <Link to = '/addfacility' className='btn btn-primary mb-2'>Add Facility</Link>
  <div className='search_bar'>
          <label>Search</label>
          <input 
            type="text" 
            value={searchFacilities}
            onChange={(e)=> setSearchFacilities(e.target.value)}
          />
          </div>
    <br/>
  <div className="app-container" >
    
        <table>
          <thead>
            <tr>
              <th>MFL CODE</th>
              <th>FACILITY NAME</th>
              <th>COUNTY</th>
              <th>SUBCOUNTY</th>
              <th>PRIVATE IP ADDRESS</th>
              <th> ELASTIC IP ADDRESS</th>
              <th>STATUS</th>
              <th>USHARI </th>
              <th>WebADT </th>
              
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
                {
                  facilities.filter((facility)=>{
                    if(searchFacilities === ""){
                        return facility;
                    } else if (facility.facilityname !== null && facility.facilityname.toLowerCase().includes(searchFacilities.toLowerCase())) {
                        return facility;
                    }else if (facility.mflcode !== null && facility.mflcode.toString().toLowerCase().includes(searchFacilities.toString().toLowerCase())) {
                        return facility;
                    }else if (facility.subcounty !== null && facility.subcounty.toLowerCase().includes(searchFacilities.toLowerCase())) {
                        return facility;
                    }else if (facility.status !== null && facility.status.toLowerCase().includes(searchFacilities.toLowerCase())) {
                      return facility;
                    }else if (facility.ipaddress !== null && facility.ipaddress.toLowerCase().includes(searchFacilities.toLowerCase())) {
                      return facility;
                    } else if (facility.county !== null && facility.county.toLowerCase().includes(searchFacilities.toLowerCase())) {
                      return facility;
                    } else if (facility.elasticipaddress !== null && facility.elasticipaddress.toLowerCase().includes(searchFacilities.toLowerCase())) {
                      return facility;
                    }
                  }).map (
                    facility => 
                        <tr key = {facility.id}>
                          
                          <td>{facility.mflcode}</td>
                          <td><Link to = {`/specificfacility/${facility.id}`}  >{facility.facilityname}</Link></td>
                          <td>{facility.county}</td>
                          <td>{facility.subcounty}</td>
                          <td><a href={`http://${facility.ipaddress}:8080/openmrs`}>{facility.ipaddress} </a> </td>
                          <td><a href={`http://${facility.elasticipaddress}:8080/openmrs`}>{facility.elasticipaddress} </a> </td>  
                          <td>{facility.status}</td>
                          <td>{ facility.ushauri? "True" : "False"}</td>
                          <td>{facility.WebADT ? "True" : "False"}</td>
                          
                            <td>
                            <Link to = {`/edit-facility/${facility.id}`} className='btn btn-info'> Update</Link>
                            </td>
                            <td>
                            <Link to = '' className = "btn btn-danger" onClick = {() => deleteFacility(facility.id)}
                                    > Delete</Link>
                            </td>
                </tr>
              
                    
                )    
                    
            }
    
        </tbody>
        </table>
      
      </div>
</div>

  )
}

export default Facilities