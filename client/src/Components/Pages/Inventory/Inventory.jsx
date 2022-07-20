import React,{useState, useEffect, useRef} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { toast  } from 'react-toastify';
import "./Inventory.css";
import moment from 'moment';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import * as AiIcons from "react-icons/ai";





const Inventory = (props) => {


 //declaring state for the inventory list upon loading the page
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const[searchInventory, setSearchInventory] = useState("")
  const tableRef =useRef(null)
  const private_axios = usePrivateAxios();
 


    useEffect(() => {
 
        getAllItems()
      
    }, [])

    //List all items in the inventory
    const getAllItems = () =>{
        private_axios.get("/Inventory")
        .then((response)=>{
            // console.log(response.data)
            setItems(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

     
    //delete item from inventory
    const deleteItem = (id) =>{
        if(window.confirm("Are you sure you want to delete this Item?")){
            private_axios.delete(`/Inventory/delete/${id}`)
        .then((response)=>{
            setItems(items.filter((item)=>{
                return item.id !== id;
            }));
            toast.success("Item deleted successfully");
            // console.log(response);
            // navigate("/inventory")
        })
        .catch((error)=>{
            console.log(error);
        });
        }
    };
    
    //handleClick on Add Inventory button
    const handleClick =()=>{
      navigate("/addinventory");
    }
    
   
    

    return (
    <div className="">
    <div >
      <div >
      <h1 className="header">Tablets Inventory</h1>
      </div>
      
      </div>
      <div  className='searchbox'>
        <input
          type="text"
         
          placeholder='Search for Item'
                value={searchInventory}
                onChange={(e)=> setSearchInventory(e.target.value)}
        ></input>
      </div>
      

      <button onClick={handleClick}
       className= "addnewinventorybtn">
         
            Add Tablet to Inventory
         
        </button>
<div className="table">
   <table className="table_content" ref={tableRef}>
    <thead className='thead'>
        <tr>
        <th>Serial</th>
        <th>IMEI</th>
        <th>Brand Name</th>
        <th>Status</th> 
        <th>Serial Number</th>
        <th>Date Registered</th>
        <th>Facility</th>
        <th>Passcode</th> 
        <th>Email</th>
        <th>Email Password</th>
        <th>Action</th>
        </tr>             
    </thead>

    <tbody className="tbody">
     {
        items.filter((item) => {
                        if(searchInventory === ""){
                           return items;
                        } 
                        else if (item.AssetNumber !== null && item.AssetNumber?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.AssetName !== null && item.AssetName?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.AssetStatus !== null && item.AssetStatus?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.serialNumber !== null && item.serialNumber?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.facility !== null && item.facility?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.Passcode !== null && item.Passcode?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.Email !== null && item.Email?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }
                        else if (item.EmailPassword !== null && item.EmailPassword?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }
                    }
                    )
        .map (
            item => 
                <tr key = {item.id} 
                    onDoubleClick={
                            () => {
                            navigate(`/updateInventory/${item.id}`)
                        }
                    }
                
        
                >
                    

                    <td > {item.id} </td>
                    <td> {item.AssetNumber} </td>
                    <td> {item.AssetName} </td>
                    <td> {item.AssetStatus} </td>
                    <td> {item.serialNumber} </td>
                    <td> {(moment(item.createdAt).format('DD-MM-YYYY | HH:MM'))} </td>
                    <td> {item.facility} </td>
                    <td> {item.Passcode} </td>
                    <td> {item.Email} </td>
                    <td> {item.EmailPassword} </td>
                            <td> <Link to = '' className = "btn btn-danger" onClick = {() => deleteItem(item.id)}
                                    style = {{marginLeft:"10px"}}>  <AiIcons.AiFillDelete/></Link>
                    </td>

                    
      

                </tr>
            
        )    
     }
    
    </tbody>
    </table>
    </div>
    </div>
  );
};

export default Inventory;



