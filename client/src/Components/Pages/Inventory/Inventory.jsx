import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast  } from 'react-toastify';
import "./Inventory.css";
import Simcards from './Simcards';
// import ReactSearchBox from "react-search-box"




const Inventory = () => {


 //declaring state for the inventory list upon loading the page
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const[searchInventory, setSearchInventory] = useState("")
  const tableRef =useRef(null)
  const[display, setDisplay] = useState("Tablets")
  const[tabletsVisible, setTabletsVisible] = useState(true)
  const[simcardsVisible, setSimcardsVisible] = useState(false)


    useEffect(() => {
        display==="Simcards"? setSimcardsVisible(true):setSimcardsVisible(false)
        display==="Tablets"? setTabletsVisible(true):setTabletsVisible(false)
        console.log(display)
        getAllItems()
      
    }, [display])

    


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


    //select table to display on page based on user choice on dropdown

const handleChange = (e)=>{
    setDisplay(e.target.value)
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
//Tablet page component
    const TabletPage = () => {
        return(
            <div>
    <div className="upper-section">
      <div className="left-panel">
      <h1 className="header">Inventory</h1>
      </div>
      <div>
     
      <div >
        
        
        
      </div>
      </div>
      </div>
      <br/>
      <input
          type="text"
          className='searchbox'
          placeholder='Search for Item'
                value={searchInventory}
                onChange={(e)=> setSearchInventory(e.target.value)}
        ></input>

      <button onClick={handleClick}
       className= "buttonadd">
         
            Add Tablet to Inventory
         
        </button>
        <div>
        <select  className= "buttonadd" value={display} onChange={handleChange}>
                  <option selected disabled ="true">--Select Item Type--</option>
                <option value="Simcards">Simcards</option>
                <option value="Tablets">Tablets</option>

              
        </select>
        {/* <ReactSearchBox
        placeholder="Placeholder"
        value=""
        data={items}
        callback={(items) => console.log(items)}
        /> */}
        </div>

      <div className="table">
   <table className="table_content" ref={tableRef}>
    <thead className=''>
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
        <th></th>
        <th></th>
        <th></th>
        

                

    </thead>

    <tbody className="">
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
                <tr key = {item.id}>

                    <td> {item.id} </td>
                    <td> {item.AssetNumber} </td>
                    <td> {item.AssetName} </td>
                    <td> {item.AssetStatus} </td>
                    <td> {item.serialNumber} </td>
                    <td> {item.createdAt} </td>
                    <td> {item.facility} </td>
                    <td> {item.Passcode} </td>
                    <td> {item.Email} </td>
                    <td> {item.EmailPassword} </td>
                
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
        )
    }
 
  //rendering inventory page based on selection
  return (
    <div>
    {tabletsVisible && <TabletPage/>}
    {simcardsVisible && <Simcards/>}

    </div>
  );
};

export default Inventory;



