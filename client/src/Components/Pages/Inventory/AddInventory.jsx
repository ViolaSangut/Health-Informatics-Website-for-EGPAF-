import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast  } from 'react-toastify';
import './AddInventory.css'
import Facilities from './Facilities.json'
import DeviceStatus from './DeviceStatus.json';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMPTY_REGEX = /^(?!\s*$).+/;

const AddInventory = ()=> {



const [validField, setValidField] = useState("")
    

const[AssetNumber, setAssetNumber]= useState("") 
const[serialNumber, setSerialNumber]= useState("") 
const[AssetStatus, setAssetStatus]= useState("") 
const[AssetName, setAssetName]= useState("") 
const[facility, setFacility]= useState("")
const[Email, setEmail]= useState("")  
const[Passcode, setPassCode]= useState("")
const[EmailPassword, setEmailPassword]= useState("")
const {id} =useParams(); 
const navigate = useNavigate();

const [items, setItems] = useState([])
const item = items.find(item => (item.id).toString() === id);
const private_axios = usePrivateAxios();



useEffect(() => {
    const result = EMPTY_REGEX.test(validField)
    console.log(result); 
  setValidField(result);
},[validField]);


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
        console.log(response.data)
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

        //Update Item
  const updateItem = async () => {


    
    try {

      const response = await  private_axios.put(`/Inventory/${id}`, {
        AssetName:AssetName, AssetNumber:AssetNumber, serialNumber:serialNumber, AssetStatus: AssetStatus,
         facility: facility, Passcode:Passcode, Email:Email, EmailPassword:EmailPassword
      });
      
      console.log(response.data);
      // console.log(response.accessToken);
      console.log(JSON.stringify(response));
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
    






    return  (
        <div align ="middle">
            <button className="buttonadd" onClick={onClickBack}>Back to Inventory</button>
        <section className="section">
            
        <form className= "">
            <h1>Device Details</h1>
            <label>
                <span className={validField ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <span className={!validField ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                Brand Name
            </label>
            <input 
            value={AssetName} 
            onChange ={(e) => setAssetName(e.target.value)} 
            placeholder='Asset Name' 
            type='text'  
            required
                aria-invalid={validField ? "false" : "true"}
                aria-describedby="validid"
            >
            </input>
            <label>
                <span className={validField ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <span className={!validField ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                Asset Number
            </label>
            <input 
            value={AssetNumber} 
            onChange ={(e) => setAssetNumber(e.target.value)} 
            placeholder='Asset Number' 
            type='text'
            required
                aria-invalid={validField ? "false" : "true"}
                aria-describedby="validid"
            >
            </input>
            <label>
                <span className={validField ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <span className={!validField ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                Serial Number
            </label>
            
            <input 
            value={serialNumber} 
            onChange ={(e) => setSerialNumber(e.target.value)} 
            placeholder='Asset Number' 
            type='text'
            required
                aria-invalid={validField ? "false" : "true"}
                aria-describedby="validid"
            >
                
            </input>
            <label>
                <span className={validField ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <span className={!validField ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                Status
            </label>
            
            <select 
            value={AssetStatus} 
            onChange ={(e) => setAssetStatus(e.target.value)}
            required
                aria-invalid={validField ? "false" : "true"}
                aria-describedby="validid"
            >
                  <option selected disabled="true">--Select Device Status--</option>
                {
                    DeviceStatus.DeviceStatus.map((result)=>( <option text={result.no}>{result.status}</option>))
                }
                 
            </select>
            
            <label>
                <span className={validField ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <span className={!validField ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                Facility Assigned
            </label>
            
             <select 
             value={facility} 
             onChange ={(e) => setFacility(e.target.value)}
             required
                aria-invalid={validField ? "false" : "true"}
                aria-describedby="validid"
             >
                  <option selected disabled="true">--Select Facility Assigned--</option>
                {
                     Facilities.Facilitynames.map((result)=>(<option text={result.no}>{result.facility}</option>))
                }
            </select>
            
             <label>
                 <span className={validField ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <span className={!validField ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                Passcode
            </label>
            <input 
            value={Passcode} 
            onChange ={(e) => setPassCode(e.target.value)} 
            placeholder='Passcode' 
            type='text'
            required
                aria-invalid={validField ? "false" : "true"}
                aria-describedby="validid"
            >
            </input>
            <label>
                 <span className={validField ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <span className={!validField ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                Email
            </label>
            <input 
            value={Email} 
            onChange ={(e) => setEmail(e.target.value)} 
            placeholder='Email' 
            type='text'
            required
                aria-invalid={validField ? "false" : "true"}
                aria-describedby="validid"
            >
            </input>
            <label>
                <span className={!validField ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                 <span className={validField ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
                Email Password
            </label>
            <input 
            value={EmailPassword} 
            onChange ={(e) => setEmailPassword(e.target.value)} 
            placeholder='Email Password' 
            type='text'>
            </input>

            <label>
             
            </label>
            <button onClick={handleSubmit} align="middle" disabled={
                    !validField ? true: false}>
                Submit
            </button>

        </form>
        </section>
        </div>
    )

}

export default AddInventory;