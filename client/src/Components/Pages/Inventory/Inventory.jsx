import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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




    //List 
    const getAllItems = () =>{
        axios.get("http://localhost:4000/Inventories")
        .then((response)=>{
            console.log(response.data)
            setItems(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
  
  



  return (
    <div>
      <h1 className="header">Inventory</h1>
      <div>
        <input
          type="text"
          className="search"
          placeholder="Search for Inventory"
        ></input>
        
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
   <table className="table table">
    <thead>
        <th>Asset Number</th>
        <th>Asset Name</th>
        <th>Date Registered</th> 
        <th>Asset Status</th> 
                

    </thead>

    <tbody>
     {
        items.map (
            item => 
                <tr key = {item.id}>

                    <td> {item.id} </td>
                    <td> {item.AssetNumber} </td>
                    <td> {item.AssetName} </td>
                    <td> {item.Dateregistered} </td>
                    <td> {item.AssetStatus} </td>

                      
                    <td>
                       
                       
                    </td>
      

                </tr>
            
        )    
     }
    
    </tbody>
    </table>
    </div>
  );
};


export default Inventory;



