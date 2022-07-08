import React, { useState, useEffect } from "react" ;
import {useForm} from "react-hook-form";
import "./addFacilities.css";
import validate from "./validateFacility";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify' ;
import { Container, Form, Button } from 'react-bootstrap';

const AddFacilityComponent = () => {

  const [facilities, setFacilities] = useState([]);
  const { id } = useParams();
  const facility = facilities.find(facility => (facility.id).toString() === id);
  const [facilityname, setFacilityName] = useState("");
  const [mflcode, setMFLcode] = useState("");
  const [subcounty, setSubcounty] = useState("");
  const [status, setStatus] = useState("");
  const [ipaddress, setIpaddress] = useState("");
  const [county, setCounty] = useState("");
  const [ushauri, setUshauri] = useState(true);
  const [WebADT, setWebADT] = useState(true);
  const [elasticipaddress,setElasticipaddress] = useState("");
  

  //FORM validation
  
  
  const navigate = useNavigate();

  const saveorUpdateFacility = (e) =>{
        e.preventDefault();
        const facility = {mflcode, facilityname, ipaddress, subcounty, county, elasticipaddress}
      //Preventing adding empty fields
        if(facility.mflcode ==="" || facility.facilityname ==="" || facility.ipaddress ==="" || facility.county ==="" || facility.subcounty ==="" || facility.elasticipaddress ===""){
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
    

    
    const saveFacility = () =>{
    
  
        axios.post("http://localhost:4000/facilities/addfacility", {
          facilityname:facilityname, mflcode:mflcode, subcounty: subcounty,
            status:status, ipaddress:ipaddress, county:county, ushauri:ushauri, WebADT:WebADT, elasticipaddress:elasticipaddress
        }).then((response)=>{
        console.log(response.data)
        console.log("Facility inserted!");
        toast.success("Facility inserted successfully")
        navigate('/facilities');
    })
    .catch((error)=>{
      console.log(error)
    });
    }
    
    
      //Update facility
    const updateFacility = () =>{
        axios.put(`http://localhost:4000/facilities/${id}`, {
          facilityname:facilityname, mflcode:mflcode, subcounty: subcounty,
            status:status, ipaddress:ipaddress, county:county, ushauri:ushauri, WebADT:WebADT, elasticipaddress:elasticipaddress
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
       

  


useEffect(() => {
    if (facility) {
        setFacilityName(facility.facilityname);
        setMFLcode(facility.mflcode);
        setSubcounty(facility.subcounty);
        setStatus(facility.status);
        setIpaddress(facility.ipaddress);
        setCounty(facility.county);
        setUshauri(facility.ushauri);
        setWebADT(facility.WebADT);
        setElasticipaddress(facility.elasticipaddress);
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
            return <h3 className="text-center">Update Facility</h3>
        } 
        else {
            return <h3 className="text-center">Add Facility</h3>

        }
        
    }

return (
  <div className="app-container" >
    <Container className='mt-5 p-2'>
    {
                        pageTitle()
                      }
      <form  className="input" onSubmit={(e) =>saveorUpdateFacility(e)} >
      <Form.Group controlId="mflcode" className="mb-3" >
                    <Form.Label>MFL CODE</Form.Label>
                    <Form.Control
                        type="number"
                        name='mflcode'
                        value=  {mflcode}
                        onChange={(e) => setMFLcode(e.target.value)}
                         />
                </Form.Group>
      
    
        <br></br>
        <Form.Group controlId="facilityname" className="mb-3" >
                    <Form.Label>FACILITY NAME</Form.Label>
                    <Form.Control
                        type="text"
                        name='facilityname'
                        value=  {facilityname}
                        onChange={(e) => setFacilityName(e.target.value)}
                         />
                </Form.Group>
        
        <br></br>
        <Form.Group controlId="county" className="mb-3">
        <Form.Label>COUNTY</Form.Label>
        <Form.Control
          as="select"
          value={county}
          onChange={(e)=>setCounty(e.target.value)}
        >
          
          <option value="selects">select county..</option>
          <option value="Kisii">Kisii</option>
          <option value="kiambu">Kiambu </option>
          <option value="homabay">Homabay </option>
        </Form.Control>
      </Form.Group>
        
        
        
        <Form.Group controlId="subcounty" className="mb-3" >
                    <Form.Label>SUBCOUNTY</Form.Label>
                    <Form.Control
                        type="text"
                        name='subcounty'
                        value=  {subcounty}
                        onChange={(e) => setSubcounty(e.target.value)}
                         />
                </Form.Group>
        
        
        <br></br>
        <Form.Group className="mb-3" controlId="ushauriCheckedid">
                        <Form.Check
                            type="checkbox"
                            name="ushauri"
                            value={ushauri}
                            onChange={(e) => setUshauri(e.target.value)}
                            label="ushauri"
                           />
                    </Form.Group>

        
        <br></br>
        <Form.Group className="mb-3" controlId="WebADTCheckedid">
                        <Form.Check
                            type="checkbox"
                            name="ushauri"
                            value={WebADT}
                            onChange={(e) =>setWebADT(e.target.value)}
                            label="WebADT"
                           />
                    </Form.Group>

        
        <br></br>
        <Form.Group controlId="status" className="mb-3">
        <Form.Label>STATUS</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option value="selects">select state of facility..</option>
          <option value="RUNNING">RUNNING</option>
          <option value="DOWN">DOWN</option>
                              
        </Form.Control>
      </Form.Group>
        
        
        <br></br>
        <Form.Group controlId="ipaddress" className="mb-3">
                    <Form.Label>IP ADDRESS</Form.Label>
                    <Form.Control
                        type="text"
                        name='ipaddress'
                        value=  {ipaddress}
                        onChange={(e) => setIpaddress(e.target.value)}
                         />
                </Form.Group>
        <br></br>
        <Form.Group controlId="elasticipaddress" className="mb-3">
                    <Form.Label>ELASTIC IP ADDRESS</Form.Label>
                    <Form.Control
                        type="text"
                        name='elasticipaddress'
                        value=  {elasticipaddress}
                        onChange={(e) => setElasticipaddress(e.target.value)}
                         />
                </Form.Group>
         
          
        <button className='form-input-btn' type='submit'>
          ADD FACILITY
        </button>
        
      </form>
      </Container>
</div>

    
  )


};

export default AddFacilityComponent