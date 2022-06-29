import React, { useState, useEffect } from "react" ;

import "./addFacilities.css";

import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify' ;


const AddFacilityComponent = () => {

  const [facilities, setFacilities] = useState([]);
  const { id } = useParams();

  const facility = facilities.find(facility => (facility.id).toString() === id);
  
  const [facilityname, setFacilityName] = useState("");
  const [mflcode, setMFLcode] = useState("");
  const [subcounty, setSubcounty] = useState("");
  const [status, setStatus] = useState("");
  const [ipaddress, setIpaddress] = useState("");
  
  
  const navigate = useNavigate();
  
const saveFacility = () =>{
  
    axios.post("http://localhost:4000/facilities/addfacility", {
      facilityname:facilityname, mflcode:mflcode, subcounty: subcounty,
        status:status, ipaddress:ipaddress, 
    }).then((response)=>{
    console.log(response.data)
    console.log("Facility inserted!");
    toast.success("Facility inserted successfully")
    navigate('/facilities');
})
.catch((error)=>{
  console.log(error)
});
};


  //Update facility
const updateFacility = () =>{
    axios.put(`http://localhost:4000/facilities/${id}`, {
      facilityname:facilityname, mflcode:mflcode, subcounty: subcounty,
        status:status, ipaddress:ipaddress
    }).then((response)=>{
    console.log(response.data)
    console.log("facility updated!");
    toast.success("facility updated successfully")
    navigate('/facilities');
})
    
    .catch((error)=>{
    console.log(error)
    });
  };

  

const saveorUpdateFacility = (e) =>{
    e.preventDefault();
    const facility = {mflcode, facilityname, ipaddress }
  //Preventing adding empty fields
    if(facility.mflcode ==="" || facility.facilityname ==="" || facility.ipaddress ===""){
        alert("All the fields are mandatory!");
     return;
    } else{
        if (id) {
            updateFacility();
        } else{
            saveFacility();
        }
    
    }
  }
useEffect(() => {
    if (facility) {
        setFacilityName(facility.facilityname);
        setMFLcode(facility.mflcode);
        setSubcounty(facility.subcounty);
        setStatus(facility.status);
        setIpaddress(facility.ipaddress);
        
    }
}, [facility])
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
    //Adding Condition to change page title dynamically
    const pageTitle = () =>{

        if(id){
            return <h3 className="text-center">Update Ticket</h3>
        } 
        else {
            return <h3 className="text-center">Add Ticket</h3>

        }
        
    }

return (
  <div className="app-container" >
    
    {
                        pageTitle()
                      }
      <form  className="input">

        <label >Facility Name</label>
        <input
          type="text"
          name="facilityname"
          required="required"
          placeholder="Enter facility name..."
          value={facilityname}
          onChange={(e) =>setFacilityName(e.target.value)}
        />
        <br></br>

        <label >MFL Code</label>
        <input
          type="text"
          name="mflcode"
          required="required"
          placeholder="enter MFL code..."
          value=  {mflcode}
          onChange={(e) =>setMFLcode(e.target.value)}
        />
        <br></br>
        <label >Subcounty</label>
        <input
          type="text"
          name="subcounty"
          required="required"
          placeholder="enter subcounty..."
          value={subcounty}
          onChange={(e) =>setSubcounty(e.target.value)}
        />
        <br></br>
        <label >Status</label>
        <input
          type="text"
          name="status"
          required="required"
          placeholder="enter the status..."
          value={status}
          onChange={(e) =>setStatus(e.target.value)}
        />
        <br></br>
        <label >IP address</label>
        <input
          type="text"
          name="ipaddress"
          required="required"
          placeholder="enter ip address"
          value={ipaddress}
          onChange={(e) =>setIpaddress(e.target.value)}
        />
        <Link to="" type="submit" className="submit" onClick={(e) => saveorUpdateFacility(e)}>Add</Link>
      </form>
</div>

    
  )


};

export default AddFacilityComponent