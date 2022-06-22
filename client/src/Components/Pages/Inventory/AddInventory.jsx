import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast  } from 'react-toastify';
import './AddInventory.css'
import moment from 'moment';
import Facilities from './Facilities.json'
import DeviceStatus from './DeviceStatus.json';
import InventoryTypes from './InventoryTypes.json';
// import { addInventory } from '../../../../../server/controllers/InventoryController';


const AddInventory = ()=> {
    

const[AssetNumber, setAssetNumber]= useState("") 
const[ItemType, setItemType]= useState("") 
const[AssetStatus, setAssetStatus]= useState("") 
const[AssetName, setAssetName]= useState("") 
const[facility, setFacility]= useState("")  
const[DateRegistered, setDateRegistered]= useState("") 
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
    setDateRegistered(item.DateRegistered)
    setFacility(item.facility)  
    setItemType(item.ItemType)
   }
 
      
    }, [item])

    useEffect(() => {
     getAllItems();
    }, [])
    

    
    //Add Item
    const addItem = () =>{
        // e.preventDefault();
        axios.post(`http://localhost:4000/inventory/addInventory`, {
            AssetName: AssetName, AssetNumber:AssetNumber, ItemType: ItemType, AssetStatus: AssetStatus, 
            facility: facility, DateRegistered: DateRegistered,
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
        AssetName:AssetName, AssetNumber:AssetNumber, ItemType:ItemType, AssetStatus: AssetStatus,
         facility: facility, DateRegistered: DateRegistered
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
    






    return  (
        <div align ="middle">
        <section className="section">
        <form className= "">
            <label>
                Asset Name
            </label>
            <input value={AssetName} onChange ={(e) => setAssetName(e.target.value)} placeholder='Asset Name' type='text'>
            </input>
            <label>
                Asset Number
            </label>
            <input value={AssetNumber} onChange ={(e) => setAssetNumber(e.target.value)} placeholder='Asset Number' type='text'>
            </input>
            <label>
                Item Type
            </label>
            
            <select  onChange ={(e) => setItemType(e.target.value)}>
                  <option selected disabled ="true">--Select Item Type--</option>
                  {
                    InventoryTypes.InventoryType.map((result) =>(<option text={result.no}>{result.name}</option>))
                }
                
            </select>
            <label>
                Asset Status
            </label>
            
            <select  onChange ={(e) => setAssetStatus(e.target.value)}>
                  <option selected disabled="true">--Select Device Status--</option>
                {
                    DeviceStatus.DeviceStatus.map((result)=>( <option text={result.no}>{result.status}</option>))
                }
                 
            </select>
            
            <label>
                Facility Assigned
            </label>
            
             <select  onChange ={(e) => setFacility(e.target.value)}>
                  <option selected disabled="true">--Select Facility Assigned--</option>
                {
                     Facilities.Facilitynames.map((result)=>(<option text={result.no}>{result.facility}</option>))
                }
            </select>
            
            
            {/* <div className='form-group'>
               <label>Date Registered </label>
               <input type="date" name="due_date" className="form-control"
                    value={(moment(DateRegistered).format('YYYY-MM-DD'))} 
                    onChange={(e)=>{setDateRegistered(e.target.value)}}
                    min={min_date}                                            
                                        />                                      
             </div> */}

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