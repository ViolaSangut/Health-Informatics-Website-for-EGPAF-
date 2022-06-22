import React,{useState, useEffect, } from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { toast  } from 'react-toastify';
import "./Inventory.css";




const Inventory = () => {


 //declaring state for the inventory list upon loading the page
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const[searchInventory, setSearchInventory] = useState("")


    useEffect(() => {

        getAllItems();
      
    }, [])

    


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

    //delete item from inventory
    const deleteItem = (id) =>{
        if(window.confirm("Are you sure you want to delete this Item?")){
            axios.delete(`http://localhost:4000/Inventory/delete/${id}`)
        .then((response)=>{
            setItems(items.filter((item)=>{
                return item.id !== id;
            }));
            toast.success("Item deleted successfully");
            console.log(response);
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
    <div>
    <div className="upper-section">
      <div className="left-panel">
      <h1 className="header">Inventory</h1>
      </div>
      <div>
     
      <div >
        <input
          type="text"
          className='buttonadd'
          placeholder='Search for Item'
                value={searchInventory}
                onChange={(e)=> setSearchInventory(e.target.value)}
        ></input>
        
        
      </div>
      </div>
      </div>
      <br/>

      <button onClick={handleClick}
       className= "buttonadd">
         
            Add Inventory
         
        </button>

      <div className="table">
   <table className="table_content">
    <thead className=''>
        <th>Serial</th>
        <th>Asset Number</th>
        <th>Asset Name</th>
        <th>Asset Status</th> 
        <th>Item Type</th>
        <th>Date Registered</th>
        <th>Facility</th>
        <th></th> 
        <th></th>
        <th></th>
        

                

    </thead>

    <tbody className="">
     {
        items.filter((item)=> {
                        if(searchInventory === ""){
                           return items;
                        } 
                        else if (item.AssetNumber !== null && item.AssetNumber?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.AssetName !== null && item.AssetName?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.AssetStatus !== null && item.AssetStatus?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.ItemType !== null && item.ItemType?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }else if (item.facility !== null && item.facility?.toLowerCase().includes(searchInventory?.toLowerCase())) {
                            return item;
                        }
                    }
                    ).map (
            item => 
                <tr key = {item.id}>

                    <td> {item.id} </td>
                    <td> {item.AssetNumber} </td>
                    <td> {item.AssetName} </td>
                    <td> {item.AssetStatus} </td>
                    <td> {item.ItemType} </td>
                    <td> {item.createdAt} </td>
                    <td> {item.facility} </td>
                
                    <td>
                            <Link to = {`/updateInventory/${item.id}`} className='btn btn-info' > Update</Link>
                            </td>
                            <td> <Link to = '' className = "btn btn-danger" onClick = {() => deleteItem(item.id)}
                                    style = {{marginLeft:"10px"}}> Delete</Link>
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



