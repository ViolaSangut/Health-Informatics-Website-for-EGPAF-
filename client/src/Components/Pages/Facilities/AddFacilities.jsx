import React, { useState, useEffect } from "react" ;
import {useForm} from "react-hook-form";
import "./addFacilities.css";
import validate from "./validateFacility";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify' ;
import { Container, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const FACILITY_REGEX = /^[A-Za-z0-9 ]+$/
const SUBCOUNTY_REGEX = /^[A-Za-z0-9 ]+$/
const ELASTIC_REGEX = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/
const IPADDRESS_REGEX =/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const MFLCODE_REGEX = /^[0-9]{5}$/;

const AddFacilityComponent = () => {

  const [facilities, setFacilities] = useState([]);
  const { id } = useParams();
  const facility = facilities.find(facility => (facility.id).toString() === id);
  const [facilityname, setFacilityName] = useState("");
  const [validFacilityname, setValidFacilityname]= useState(false);
  const [mflcode, setMFLcode] = useState("");
  const [validMflcode, setValidMflcode]= useState(false);
  const [subcounty, setSubcounty] = useState("");
  const [validSubcounty, setValidSubcounty]= useState(false);
  const [status, setStatus] = useState("");
  const [ipaddress, setIpaddress] = useState("");
  const [validIpaddress, setValidIpaddress]= useState(false);
  const [county, setCounty] = useState("");
  const [ushauri, setUshauri] = useState("");
  const [WebADT, setWebADT] = useState("");
  const [elasticipaddress,setElasticipaddress] = useState("");
  const [validElasticIpaddress, setValidElasticIpaddress]= useState(false);

  const privateAxios = usePrivateAxios();

  //FORM validation
  useEffect(() => {
    const result = MFLCODE_REGEX.test(mflcode);
    // console.log(result);
    setValidMflcode(result);
  }, [mflcode]);

  useEffect(() => {
    const result = FACILITY_REGEX.test(facilityname);
    // console.log(result);
    setValidFacilityname(result);
  }, [facilityname]);

  useEffect(() => {
    const result = IPADDRESS_REGEX.test(ipaddress);
    // console.log(result);
    setValidIpaddress(result);
  }, [ipaddress]);
  useEffect(() => {
    const result = ELASTIC_REGEX.test(elasticipaddress);
    // console.log(result);
    setValidElasticIpaddress(result);
  }, [elasticipaddress]);
  useEffect(() => {
    const result = SUBCOUNTY_REGEX.test(subcounty);
    // console.log(result);
    setValidSubcounty(result);
  }, [subcounty]);
  
  
  const navigate = useNavigate();

  const saveorUpdateFacility = (e) =>{
        e.preventDefault();
        const facility = {mflcode, facilityname, ipaddress, subcounty, county, elasticipaddress}
      //Preventing adding empty fields
        if(facility.mflcode ==="" || facility.facilityname ==="" || facility.ipaddress ==="" || facility.county ==="" || facility.subcounty ==="" || facility.elasticipaddress ===""){
            alert("Enter all the mandatory fields !");
         return;
        } else{
            if (id) {
                updateFacility();
            } else{
                saveFacility();
            }      
        }
    }

    //Add Facility  
    const saveFacility = async () =>{


        privateAxios.post("/facilities/addfacility", {
          facilityname:facilityname, mflcode:mflcode, subcounty: subcounty,
            status:status, ipaddress:ipaddress, county:county, ushauri:ushauri, WebADT:WebADT, elasticipaddress:elasticipaddress
        }).then((response)=>{
          navigate("/facilities");
        console.log("Facility inserted!");
        toast.success("Facility inserted successfully")
       
        })
        .catch((error)=>{
          console.log(error)
        });
    }
    
      //Update facility
    const updateFacility = () =>{
        privateAxios.put(`/facilities/${id}`, {
          facilityname:facilityname, mflcode:mflcode, subcounty: subcounty,
            status:status, ipaddress:ipaddress, county:county, ushauri:ushauri, WebADT:WebADT, elasticipaddress:elasticipaddress
        }).then((response)=>{
        console.log(response.data)
        console.log("facility updated!");
        toast.success("facility updated successfully")
        navigate('/facilities');
    })
        
        .catch((error)=>{
          toast.success(error)
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
    privateAxios.get("/facilities")
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
      <Form  className="input" onSubmit={(e) =>saveorUpdateFacility(e)} >
      <Form.Group controlId="mflcode" className="mb-3" >
                    <Form.Label>MFL CODE</Form.Label>
                    <Form.Control
                        type="number"
                        name='mflcode'
                        value=  {mflcode}
                        required
                        aria-invalid={validMflcode ? "false" : "true"}
                        aria-describedby="mflcodeid"
                        onChange={(e) => setMFLcode(e.target.value)}
                         />
                </Form.Group>
      
                <p
                  id="mflcodeid"
                  className={
                  mflcode && !validMflcode
                  ? "instructions"
                  : "offscreen"}>
                  <br />
                  mflcode must contain only upto 5 numbers!
                 </p>
        
        <Form.Group controlId="facilityname" className="mb-3" >
                    <Form.Label>FACILITY NAME</Form.Label>
                    <Form.Control
                        type="text"
                        name='facilityname'
                        value=  {facilityname}
                        required
                        aria-invalid={validFacilityname ? "false" : "true"}
                        aria-describedby="facilitynameid"
                        onChange={(e) => setFacilityName(e.target.value)}
                         />
                </Form.Group>

                <p
                  id="facilitynameid"
                  className={
                  facilityname && !validFacilityname
                  ? "instructions"
                  : "offscreen"}>
                  <br />
                  facility name cannot contain symbols. only numbers and letters!
                 </p>    
        
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
                        aria-invalid={validSubcounty ? "false" : "true"}
                        aria-describedby="subcountyid"
                        onChange={(e) => setSubcounty(e.target.value)}
                         />
                </Form.Group>
        
                <p
                  id="subcountyid"
                  className={
                  subcounty && !validSubcounty
                  ? "instructions"
                  : "offscreen"}>
                  <br />
                  subcounty name can only contain letters and numbers
                 </p>
        <br></br>
        
        <Form.Control
          as="select"
          value={ushauri}
          onChange={(e)=>setUshauri(e.target.value)}
        >
          <option value="selects">select Ushauri version installed...</option>
          <option value="0">None</option>
          <option value="version 4.0.1">version 4.0.1</option>
          <option value="version 3.4.2">version 3.4.2</option>
          <option value="version 4.0.0">version 4.0.0</option>
                              
        </Form.Control>
       
        <br></br>
        
        <Form.Control
          as="select"
          value={WebADT}
          onChange={(e)=>setWebADT(e.target.value)}
        >
          <option value="selects">select WebADT version installed...</option>
          <option value="0">None</option>
          <option value="version 4.0.1">version 4.0.1</option>
          <option value="version 3.4.2">version 3.4.2</option>
          <option value="version 4.0.0">version 4.0.0</option>
                              
        </Form.Control>
        
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
                    <Form.Label>PRIVATE IP ADDRESS </Form.Label>
                    <Form.Control
                        type="text"
                        name='ipaddress'
                        value=  {ipaddress}
                        aria-invalid={validIpaddress ? "false" : "true"}
                        aria-describedby="ipaddressid"
                        onChange={(e) => setIpaddress(e.target.value)}
                         />
                </Form.Group>
                <p
                  id="ipaddressid"
                  placeholder="for example 192.168.1.45"
                  className={
                  ipaddress && !validIpaddress
                  ? "instructions"
                  : "offscreen"}>
                  <br />
                  invalid private ip address. ip address should look 
                 </p>
        <br></br>
        <Form.Group controlId="elasticipaddress" className="mb-3">
                    <Form.Label>ELASTIC IP ADDRESS</Form.Label>
                    <Form.Control
                        type="text"
                        name='elasticipaddress'
                        placeholder="for example 10.201.30.45"
                        value=  {elasticipaddress}
                        aria-invalid={validElasticIpaddress ? "false" : "true"}
                        aria-describedby="elasticid"
                        onChange={(e) => setElasticipaddress(e.target.value)}
                         />
                </Form.Group>
                 <p
                  id="elasticid"
                  placeholder="for example 192.168.1.45"
                  className={
                  elasticipaddress && !validElasticIpaddress
                  ? "instructions"
                  : "offscreen"}>
                  <br />
                  invalid private ip address.  
                 </p>
          
        <Button variant="primary" type='submit'
        disabled={( !validMflcode|| !validFacilityname || !validIpaddress || !validElasticIpaddress || !validSubcounty) ? true : false}>
          
                {id 
                 ? <> Update Facility</>
                 : <> Add Facility</>}
        </Button>
        
      </Form>
      </Container>
</div>

    
  )


};

export default AddFacilityComponent