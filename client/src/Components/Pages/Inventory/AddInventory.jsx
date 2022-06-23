import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast  } from 'react-toastify';
import './AddInventory.css'
import Facilities from './Facilities.json'
import DeviceStatus from './DeviceStatus.json';


const AddInventory = ()=> {
    

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
const min_date  = new Date();


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
        axios.post(`http://localhost:4000/inventory/addInventory`, {
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
    });
    };

    
    //List all items in the inventory
        const getAllItems = () =>{
            axios.get("http://localhost:4000/Inventory")
            .then((response)=>{
                console.log(response.data)
                setItems(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        }

        //Update Item
  const updateItem = async () => {


    
    try {

      const response = await  axios.put(`http://localhost:4000/Inventory/${id}`, {
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
                Brand Name
            </label>
            <input value={AssetName} onChange ={(e) => setAssetName(e.target.value)} placeholder='Asset Name' type='text'>
            </input>
            <label>
                Asset Number
            </label>
            <input value={AssetNumber} onChange ={(e) => setAssetNumber(e.target.value)} placeholder='Asset Number' type='text'>
            </input>
            <label>
                Serial Number
            </label>
            
            <input value={serialNumber} onChange ={(e) => setSerialNumber(e.target.value)} placeholder='Asset Number' type='text'>
            </input>
            <label>
                Status
            </label>
            
            <select value={AssetStatus} onChange ={(e) => setAssetStatus(e.target.value)}>
                  <option selected disabled="true">--Select Device Status--</option>
                {
                    DeviceStatus.DeviceStatus.map((result)=>( <option text={result.no}>{result.status}</option>))
                }
                 
            </select>
            
            <label>
                Facility Assigned
            </label>
            
             <select value={facility} onChange ={(e) => setFacility(e.target.value)}>
                  <option selected disabled="true">--Select Facility Assigned--</option>
                {
                     Facilities.Facilitynames.map((result)=>(<option text={result.no}>{result.facility}</option>))
                }
            </select>
            
             <label>
                Passcode
            </label>
            <input value={Passcode} onChange ={(e) => setPassCode(e.target.value)} placeholder='Passcode' type='text'>
            </input>
            <label>
                Email
            </label>
            <input value={Email} onChange ={(e) => setEmail(e.target.value)} placeholder='Email' type='text'>
            </input>
            <label>
                Email Password
            </label>
            <input value={EmailPassword} onChange ={(e) => setEmailPassword(e.target.value)} placeholder='Email Password' type='text'>
            </input>

            <label>
             
            </label>
            <button onClick={handleSubmit} align="middle">
                Submit
            </button>

        </form>
        </section>
        </div>
    )

}

export default AddInventory;