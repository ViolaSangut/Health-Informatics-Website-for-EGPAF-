import React, { useState, useEffect } from "react" ;
import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const FACILITY_REGEX = /^[A-Za-z0-9 ]/
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
        // console.log(response.data)
        // console.log("facility updated!");
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
        // console.log(response.data)
        setFacilities(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })}
    //Adding Condition to change page title dynamically
    const pageTitle = () =>{

        if(id){
            return <h3 className="text-center mb-4 mt-3">Update Facility</h3>
        } 
        else {
            return <h3 className="text-center mb-4 mt-3">Add Facility</h3>

        }
        
    }

    //handling click on the back to facilities button
    const onClickBack=() =>{
      navigate('/facilities');	
    }

return (
    <div className="container">
      {/* Back to Facilities */}
        <button  class="btn btn-outline-success mt-3"onClick={onClickBack}>Back to Facilities</button> 
        {
           pageTitle()
        }
      <div   onSubmit={(e) =>saveorUpdateFacility(e)} >
      <div  className="form-group row mt-2"> 
                    <label className="col-sm-3 col-form-label">MFL CODE</label>
                    <div className="col-sm-6">
                    <input
                    className="form-control"
                        type="text"
                        name='mflcode'
                        value=  {mflcode}
                        required
                        aria-invalid={validMflcode ? "false" : "true"}
                        aria-describedby="mflcodeid"
                        onChange={(e) => setMFLcode(e.target.value)}
                         />
                </div>
                </div>
                <p
                  id="mflcodeid"
                  className={
                  mflcode && !validMflcode
                  ? "instructions"
                  : "offscreen"}>
                  <br />
                  mflcode must contain only upto 5 numbers!
                 </p>
        
        <div  className="form-group row mt-2" >
                    <label className="col-sm-3 col-form-label">Facility Name</label>
                    <div className="col-sm-6">
                    <input
                    className="form-control"
                        type="text"
                        name='facilityname'
                        value=  {facilityname}
                        required
                        aria-invalid={validFacilityname ? "false" : "true"}
                        aria-describedby="facilitynameid"
                        onChange={(e) => setFacilityName(e.target.value)}
                         />
                </div>
                </div>
                <p
                  id="facilitynameid"
                  className={
                  facilityname && !validFacilityname
                  ? "instructions"
                  : "offscreen"}>
                  <br />
                  facility name cannot contain symbols. only numbers and letters!
                 </p>    
        
        <div  className="form-group row mt-2">
        <label className="col-sm-3 col-form-label">County</label>
        <div className="col-sm-6">
              <select
                className="form-select"
                value={county}
                onChange={(e)=>setCounty(e.target.value)}
              >
                
                <option value="selects">select county..</option>
                <option value="Kisii">Kisii</option>
                <option value="kiambu">Kiambu </option>
                <option value="homabay">Homabay </option>
              </select>
      </div>
      </div>
        
        
        
        <div  className="form-group row mt-2"> 
                    <label className="col-sm-3 col-form-label">Sub-County</label>
                    <div className="col-sm-6">
                    <input
                    className="form-control"
                        type="text"
                        name='subcounty'
                        value=  {subcounty}
                        aria-invalid={validSubcounty ? "false" : "true"}
                        aria-describedby="subcountyid"
                        onChange={(e) => setSubcounty(e.target.value)}
                         />
                </div>
                </div>
        
                <p
                  id="subcountyid"
                  className={
                  subcounty && !validSubcounty
                  ? "instructions"
                  : "offscreen"}>
                  <br />
                  subcounty name can only contain letters and numbers
                 </p>
        <div className="form-group row mt-2">
          <div className="col-sm-3">
            <label>WebADT & Ushauri</label>
          </div>
          <div className="col-md-4">
        <select
        className="form-select"
          value={ushauri}
          onChange={(e)=>setUshauri(e.target.value)}
        >
          <option value="selects">select Ushauri version installed...</option>
          <option value="0">None</option>
          <option value="version 4.0.1">version 4.0.1</option>
          <option value="version 3.4.2">version 3.4.2</option>
          <option value="version 4.0.0">version 4.0.0</option>
                              
        </select>
        <div >  
        <select
        className="form-select mt-2"
          value={WebADT}
          onChange={(e)=>setWebADT(e.target.value)}
        >
          <option value="selects">select WebADT version installed...</option>
          <option value="1">None</option>
          <option value="version 4.0.1">version 4.0.1</option>
          <option value="version 3.4.2">version 3.4.2</option>
          <option value="version 4.0.0">version 4.0.0</option>
                              
        </select>
        </div>
        </div>
        </div>

        <div  className="form-group row mt-2">
        <label className="col-sm-3 col-sm-label">KenyaEMR Status</label>
        <div className="col-md-6">
        <select
        className="form-select"
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option value="selects">select state of facility..</option>
          <option value="RUNNING">RUNNING</option>
          <option value="DOWN">DOWN</option>
                              
        </select>
      </div>
      </div>
        
          <div  className="form-group row mt-2">
                    <label className="col-sm-3 col-form-label">Private IP Address </label>
                    <div className="col-sm-6">
                    <input
                    className="form-control"
                        type="text"
                        name='ipaddress'
                        value=  {ipaddress}
                        aria-invalid={validIpaddress ? "false" : "true"}
                        aria-describedby="ipaddressid"
                        onChange={(e) => setIpaddress(e.target.value)}
                         />
                </div>
                </div>
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
        <div className="form-group row mt-2">
                    <label className="col-sm-3 col-sm-label">Elastic IP Adress</label>
                    <div className="col-md-6">
                    <input
                        className="form-control"
                        type="text"
                        name='elasticipaddress'
                        placeholder="for example 10.201.30.45"
                        value=  {elasticipaddress}
                        aria-invalid={validElasticIpaddress ? "false" : "true"}
                        aria-describedby="elasticid"
                        onChange={(e) => setElasticipaddress(e.target.value)}
                         />
                </div>
                </div>
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
          <div className="mt-3 offset-sm-3">
        <button  onClick={saveorUpdateFacility} className="btn btn-success col-md-3 " type='submit'
        disabled={( !validMflcode|| !validFacilityname || !validIpaddress || !validElasticIpaddress || !validSubcounty) ? true : false}>
          
                {id 
                 ? <> Update Facility</>
                 : <> Add Facility</>}
        </button>
        </div>
      </div>
      </div>

    
  )


};

export default AddFacilityComponent