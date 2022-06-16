import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast  } from 'react-toastify';
import "./Inventory.css";




const Inventory = () => {
  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
  function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

//declaring state for the inventory list upon loading the page
  const [items, setItems] = useState([]);
    const navigate = useNavigate();

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
          className='search'
          placeholder="Search for Inventory"
        ></input>
        
      </div>
      </div>
      </div>
       <div className="dropdown">
          <button onClick={dropDown} className="dropbtn">
          Select Item Type
          </button>
      <div id="myDropdown" className="dropdown-content">
          <a href="#">Tablet</a>
          <a href="#">CPU</a>
          <a href="#">Monitor</a>
          <a href="#">Charger</a>
      </div>
      </div>

      <br/>

      <div className="table">
   <table className="table-content">
    <thead className='table-header'>
        <th>Serial</th>
        <th>Asset Name</th>
        <th>Asset Number</th>
        <th>Item Type</th> 
        <th>Asset Status</th> 
        <th>Facility Assigned</th>
        <th>Date Registered</th>
        <th></th> 
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>

                

    </thead>

    <tbody className="">
     {
        items.map (
            item => 
                <tr key = {item.id}>

                    <td> {item.id} </td>
                    <td> {item.AssetName} </td>
                    <td> {item.AssetNumber} </td>
                    <td> {item.Dateregistered} </td>
                    <td> {item.AssetStatus} </td>
                    <td> {item.facility} </td>
                
                    <td>
                            <Link to = {`/edit-item/${item.id}`} className='btn btn-info'> Update</Link>
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



