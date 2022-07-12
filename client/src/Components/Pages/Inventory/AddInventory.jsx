import React, {useState, useRef, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast  } from 'react-toastify';
import './AddInventory.css'
import Facilities from './Facilities.json'
import DeviceStatus from './DeviceStatus.json';
import axios from "axios";
import usePrivateAxios from '../../hooks/usePrivateAxios';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ASSET_REGEX = /^[A-Za-z0-9 ]+$/
const SERIAL_REGEX = /^[0-9]+$/
const PIN_REGEX = /^[0-9]{4}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;

const AddInventory = ()=> {


const[AssetNumber, setAssetNumber]= useState("")
const [validNumber, setValidNumber]= useState(false);
const [numberFocus, setNumberFocus]= useState(false);


const[serialNumber, setSerialNumber]= useState("")
const [validSerial, setValidSerial]= useState(false);
const [serialFocus, setSerialFocus]= useState(false);


const[AssetStatus, setAssetStatus]= useState("")
const [validStatus, setValidStatus]= useState(false);
const [statusFocus, setStatusFocus]= useState(false);


const[AssetName, setAssetName]= useState("")
const [validName, setValidName]= useState(false);
const [nameFocus, setNameFocus]= useState(false);


const[facility, setFacility]= useState("")
const [validFacility, setValidFacility]= useState(false);
const [facilityFocus, setFacilityFocus]= useState(false);


const[Email, setEmail]= useState("") 
const [validEmail, setValidEmail]= useState(false);
const [emailFocus, setEmailFocus]= useState(false);


const[Passcode, setPassCode]= useState("")
const [validPasscode, setValidPasscode]= useState(false);
const [passcodeFocus, setPasscodeFocus]= useState(false);

const[EmailPassword, setEmailPassword]= useState("")
const [validPassword, setValidPassword]= useState(false);
const [passwordFocus, setPasswordFocus]= useState(false);


const {id} =useParams(); 
const navigate = useNavigate();
const [facilities, setFacilities] = useState([]);
const [items, setItems] = useState([])
const item = items.find(item => (item.id).toString() === id);

//definition of private axios
const private_axios = usePrivateAxios();

//checking input against regex on entry
useEffect(() => {
    const result = SERIAL_REGEX.test(serialNumber);
    // console.log(result);
    setValidSerial(result);
  }, [serialNumber]);

  useEffect(() => {
    const result = ASSET_REGEX.test(AssetNumber);
    // console.log(result);
    setValidNumber(result);
  }, [AssetNumber]);

  useEffect(() => {
    const result = PIN_REGEX.test(Passcode);
    // console.log(result);
    setValidPasscode(result);
  }, [Passcode]);
  
  useEffect(() => {
    const result = EMAIL_REGEX.test(Email);
    // console.log(result);
    setValidEmail(result);
  }, [Email]);

  useEffect(() => {
    const result = PWD_REGEX.test(EmailPassword);
    // console.log(result);
    setValidPassword(result);
  }, [EmailPassword]);

  useEffect(() => {
    const result = ASSET_REGEX.test(AssetName);
    // console.log(result);
    setValidName(result);
  }, [AssetName]);

useEffect(() => {
    const result = ASSET_REGEX.test(facility);
    // console.log(result);
    setValidFacility(result);
  }, [facility]);

  useEffect(() => {
    const result = ASSET_REGEX.test(AssetStatus);
    // console.log(result);
    setValidStatus(result);
  }, [AssetStatus]);


 useEffect(() => {
   if(item){
    setAssetNumber(item.AssetNumber)
    setAssetName(item.AssetName)
    setAssetStatus(item.AssetStatus)
    setFacility(item.facility)  
    setSerialNumber(item.serialNumber)
    setEmail(item.Email)
    setEmailPassword(item.EmailPassword)
    setPassCode(item.Passcode)
   }
 
      
    }, [item])

    useEffect(() => {
     getAllItems();
    }, [])
    

    
    //Add Item
    const addItem = () =>{
        // e.preventDefault();
        private_axios.post(`/inventory/addInventory`, {
            AssetName: AssetName, AssetNumber:AssetNumber, serialNumber: serialNumber, AssetStatus: AssetStatus, 
            facility: facility, Passcode: Passcode, Email: Email, EmailPassword: EmailPassword
        }).then((response)=>{
        // console.log(response.data)
        // console.log("item inserted!");
        toast.success("Item Saved Successfully")
        navigate('/inventory');
    })      

    .catch((error)=>{
      console.log(error)
      alert("Error: " + error.message);
    });
    };

    
    //List all items in the inventory
        const getAllItems = () =>{
            private_axios.get("/Inventory")
            .then((response)=>{
                // console.log(response.data)
                setItems(response.data);
            })
            .catch((error)=>{
                console.log(error);
                alert("Error: " + error.message);
            })
        }

        //get facilities
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

        //Update Item
  const updateItem = async () => {


    
    try {

      const response = await  private_axios.put(`/Inventory/${id}`, {
        AssetName:AssetName, AssetNumber:AssetNumber, serialNumber:serialNumber, AssetStatus: AssetStatus,
         facility: facility, Passcode:Passcode, Email:Email, EmailPassword:EmailPassword
      });
      
      // console.log(response.data);
      // console.log(response.accessToken);
      // console.log(JSON.stringify(response));
      // setSuccess(true);
      toast.success("Item Updated Succesfully");
      navigate('/Inventory')
      //clear input fields
    } catch (err) {
       console.log(err);
       
  };
  }


  const handleSubmit =(e) =>{
    e.preventDefault();
      if(id){
        updateItem();
    } else {
        addItem();
    }
  }
  const onClickBack =() =>{
    navigate("/inventory")
  }

  //Change Sumit button title dynamically
  if(id){
    <p>Update</p>
  } else {
    <p>Add</p>
  }

  

    return  (
        <div align ="middle">
            <button className="buttonadd" onClick={onClickBack}>Back to Inventory</button>
        <section className="section">
            
        <form className= "">
            <h1>Device Details</h1>
            <label>
                <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !AssetName ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                Brand Name
            </label>
            <input 
            value={AssetName} 
            onChange ={(e) => setAssetName(e.target.value)} 
            placeholder='Asset Name' 
            type='text'  
            required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="nameid"
                onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            <p
              id="nameid"
              className={
                nameFocus && AssetName && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Brand Name cannot contain numbers!
            </p>
            <label>
                <span className={validNumber ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validNumber || !AssetNumber ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                Asset Number
            </label>
            <input 
            value={AssetNumber} 
            onChange ={(e) => setAssetNumber(e.target.value)} 
            placeholder='Asset Number' 
            type='text'
            required
                aria-invalid={validNumber ? "false" : "true"}
                aria-describedby="validid"
            onFocus={() => setNumberFocus(true)}
              onBlur={() => setNumberFocus(false)}
            >
            </input>
            <p
              id="validid"
              className={
                numberFocus && AssetNumber && !validNumber
                  ? "instructions"
                  : "offscreen"
              }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Must have be a valid Asset Number containing numbers only!
            </p>
            <label>
                <span className={validSerial ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validSerial || !serialNumber ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                Serial Number
            </label>
            
            <input 
            value={serialNumber} 
            onChange ={(e) => setSerialNumber(e.target.value)} 
            placeholder='Asset Number' 
            type='text'
            required
                aria-invalid={validSerial ? "false" : "true"}
                aria-describedby="serialid"
                onFocus={() => setSerialFocus(true)}
              onBlur={() => setSerialFocus(false)}
            >
                
            </input>
            <p
              id="serialid"
              className={
                serialFocus && serialNumber && !validSerial
                  ? "instructions"
                  : "offscreen"
              }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Must have be a valid serial Number containing numbers only!
            </p>
            <label>
                <span className={validStatus ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validStatus || !AssetStatus ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                Status
            </label>
           
            <select 
            value={AssetStatus} 
            onChange ={(e) => setAssetStatus(e.target.value)}
            required
                aria-invalid={validStatus ? "false" : "true"}
                aria-describedby="statusid"
                onFocus={() => setStatusFocus(true)}
              onBlur={() => setStatusFocus(false)}
            >
                  <option selected disabled="true">--Select Device Status--</option>
                {
                    DeviceStatus.DeviceStatus.map((result)=>( <option text={result.no}>{result.status}</option>))
                }
                 
            </select>
             <p
              id="statusid"
              className={
                statusFocus && AssetStatus && !validStatus
                  ? "instructions"
                  : "offscreen"
              }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Please select the current device status!
            </p>
            <label>
                <span className={validFacility ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validFacility || !facility ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                Facility Assigned
            </label>
            
             <select 
             value={facility} 
             onChange ={(e) => setFacility(e.target.value)}
             required
                aria-invalid={validFacility ? "false" : "true"}
                aria-describedby="facilityid"
                onFocus={() => setFacilityFocus(true)}
              onBlur={() => setFacilityFocus(false)}
             >
                  <option selected disabled="true">--Select Facility Assigned--</option>
                {
                     facilities.map((facility)=>(<option key={facility.id}text={facility.mflcode}>{facility.facilityname}</option>))
                }
            </select>
            <p
              id="facilityid"
              className={
                facilityFocus && facility && !validFacility
                  ? "instructions"
                  : "offscreen"
              }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Please select the facility assigned to this device!
            </p>
             <label>
                 <span className={validPasscode ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPasscode || !Passcode ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                Passcode
            </label>
            <input 
            value={Passcode} 
            onChange ={(e) => setPassCode(e.target.value)} 
            placeholder='Passcode' 
            type='text'
            required
                aria-invalid={validPasscode ? "false" : "true"}
                aria-describedby="passid"
                onFocus={() => setPasscodeFocus(true)}
              onBlur={() => setPasscodeFocus(false)}
            >
            </input>
            <p
              id="passid"
              className={
                passcodeFocus && Passcode && !validPasscode
                  ? "instructions"
                  : "offscreen"
              }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Passcode can only be 4 digits!
            </p>
            <label>
                 <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !Email ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                Email
            </label>
            <input 
            value={Email} 
            onChange ={(e) => setEmail(e.target.value)} 
            placeholder='Email' 
            type='text'
            required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="validid"
            onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            >
            </input>
            <p
              id="passid"
              className={
                emailFocus && Email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Has to be a valid Email!
            </p>
            <label>
                <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !EmailPassword ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                Email Password
            </label>
            <input 
            value={EmailPassword} 
            onChange ={(e) => setEmailPassword(e.target.value)} 
            placeholder='Email Password' 
            type='text'
            required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="passwordid"
            onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            >
            </input>
              <p
              id="passwordid"
              className={
                passwordFocus && EmailPassword && !validPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Password has to have, one special character, uppercase and 
              lowercase letters and a number. Special characters are also allowed.
            </p>
            <label>
             
            </label>
            <button onClick={handleSubmit} align="middle" 
            disabled={(!validFacility|| !validEmail || !validPassword || !validPasscode || !validSerial || !validStatus || !validName || !validNumber) ? true : false}
            >
                {id 
                 ? <> Update </>
                 : <> Add </>}
            </button>

        </form>
        </section>
        </div>
    )

}

export default AddInventory;