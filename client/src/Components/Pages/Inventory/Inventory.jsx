import React,{useState, useEffect, useRef} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { toast  } from 'react-toastify';
import "./Inventory.css";
import moment from 'moment';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import * as AiIcons from "react-icons/ai";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle, faPlus
} from "@fortawesome/free-solid-svg-icons";

import * as BSIcons from 'react-icons/bs';
import * as RIIcons from 'react-icons/ri';
import * as BIIcons from 'react-icons/bi'




const Inventory = () => {


 //declaring state for the inventory list upon loading the page
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const[searchInventory, setSearchInventory] = useState("")
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

    const ItemOnHover = <h2 className='ItemOnHover'>Add new Item</h2>
    
   
    

    return (
    <div className="container">
    
      <div >
      <h3 class="text-center mb-3 mt-5 fw-bold">Tablets Inventory</h3>
      </div>

      <div  class="form-outline mb-4 col-sm-3">
        <input
          type="search"
          class="form-control"
          id="search-inventory"
          placeholder='Start typing here to search...'
                value={searchInventory}
                onChange={(e)=> setSearchInventory(e.target.value)}
        />
      </div>
      
        <div class="form-group row mt-2 mb-1">
                <button onClick={handleClick} className="addbtn col-sm-1 ">
                        < BIIcons.BiPlusMedical />
                    </button>

                    <div class="col-md-6">
                    <ReactHTMLTableToExcel
                                id="tablets-download-button"
                                table="table-to-xls"
                                className="btn btn-outline-success"
                                filename = "Tablet-List"
                                sheet="tablexls"
                                buttonText={<RIIcons.RiFileExcel2Fill/>}/>
        </div>
        </div>
<div class="table-responsive">
   <table class="table  table-striped table-hover table-sm mt-5 table-light" id="table-to-xls" >
    <thead className='theader'>
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

    <tbody >
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



