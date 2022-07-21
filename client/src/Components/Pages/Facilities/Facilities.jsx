
import React, { useState, useEffect } from "react" ;
import "./Facilities.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify' ;
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as AiIcons from "react-icons/ai";






const Facilities = () => {

  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();
  let [searchFacilities, setSearchFacilities] = useState("");
  const id = useParams();


  //Listing Facilties By county
  const filterByCounty = () =>{
    if (window.location.pathname === "/facilities") {
      getAllFacilities();
    } else if(window.location.pathname === "/facilities/1"){
      getHomaBayFacilities();
    } else if(window.location.pathname === "/facilities/2"){
      getKiambuFacilities();
    } else if(window.location.pathname === "/facilities/3"){
      getKisiiFacilities();
    }

  }

  //Changing Facilities List Title Dynamically 
  const facilityListPageTitle = () =>{
    if (window.location.pathname === "/facilities" || window.location.pathname === "/facilities/") {
      return <h2 className='text-center'>All Facilities</h2>  
    } else if(window.location.pathname === "/facilities/1" || window.location.pathname === "/facilities/1/"){
      return <h2 className='text-center'>Homa Bay Facilities</h2>
    } else if(window.location.pathname === "/facilities/2" || window.location.pathname === "/facilities/2/") {
      return <h2 className='text-center'>Kiambu Facilities</h2>
    } else if(window.location.pathname === "/facilities/3" || window.location.pathname === "/facilities/3/"){
      return <h2 className='text-center'>Kisii Facilities</h2>
    }

  }


  useEffect(() => {   
    
    filterByCounty();
  }, [])

  //Get All Facilities
  const getAllFacilities = () =>{
    axios.get("http://localhost:4000/facilities")
    .then((response)=>{
        console.log(response.data)
        setFacilities(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })}

  //Get HomaBay Facilities
  const getHomaBayFacilities = () =>{
    axios.get("http://localhost:4000/facilities/homabayfacilities")
    .then((response)=>{
        console.log(response.data)
        setFacilities(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })}

  //Get Kiambu Facilities
  const getKiambuFacilities = () =>{
    axios.get("http://localhost:4000/facilities/kiambufacilities")
    .then((response)=>{
        console.log(response.data)
        setFacilities(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })}

  //Get Kisii Facilities
  const getKisiiFacilities = () =>{
    axios.get("http://localhost:4000/facilities/kisiifacilities")
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
  const handleClick = () => {
    navigate('/addfacility')
  }

return (
  
  <div style={{textAlign: "center"}} >
  {
    facilityListPageTitle()
  } 

  <button onClick={handleClick} className='addnewfacilitybtn'>Add Facility</button>
            
  <div className="searchbox">
          <input 
            type="text" 
            value={searchFacilities}
            placeholder = "Type to search"
            onChange={(e)=> setSearchFacilities(e.target.value)
            }
          />
          </div>
    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="addnewinventorybtn"
                    table="table-to-xls"
                    filename="Facilities"
                    sheet="Facilities"
                    buttonText="Export Data to Excel Sheet"/>
  <div className="table" >
    
        <table className="table_content" id="table-to-xls">
          <thead className="thead">
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
          <tbody className="tbody">
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
                        <tr key = {facility.id}
                        onDoubleClick={
                            () => {
                            navigate(`/edit-facility/${facility.id}`)
                        }}
                        >
                          
                          <td>{facility.mflcode}</td>
                          <td><Link to = {`/specificfacility/${facility.id}`}  >{facility.facilityname}</Link></td>
                          <td>{facility.county}</td>
                          <td>{facility.subcounty}</td>
                          <td><a href={`http://${facility.ipaddress}:8080/openmrs`}>http://{facility.ipaddress}:8080/openmrs </a> </td>
                          <td><a href={`http://${facility.elasticipaddress}:8080/openmrs`}>{facility.elasticipaddress} </a> </td>  
                          <td>{facility.status}</td>
                          <td>{ facility.ushauri ===1 ? "In use" : "Not in Use"}</td>
                          <td>{facility.WebADT ===1 ? "In use" : "Not in Use" }</td>
                          
                            <td>
                            <Link to = '' className = "btn btn-danger" onClick = {() => deleteFacility(facility.id)}
                                    > <AiIcons.AiFillDelete/></Link>
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