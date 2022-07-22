import React from 'react'
import Inventory from './Inventory'
import Simcards from './Simcards'
import { useState, useEffect} from 'react'
import "./Inventory.css"

//declaring state for inventory
const InventoryMain = () => {
    const[tabletsVisible, setTabletsVisible] = useState(true)
  const[simcardsVisible, setSimcardsVisible] = useState(false)
  const[display, setDisplay] = useState("Tablets")


//choosing display table upon page loading
useEffect(() => {
        display==="Simcards"? setSimcardsVisible(true):setSimcardsVisible(false)
        display==="Tablets"? setTabletsVisible(true):setTabletsVisible(false)
        // console.log(display)
        // getAllItems()
      
    }, [display])



//changing tables upon drop down selection
  const handleChange = (e)=>{
    setDisplay(e.target.value)
}

//render table on screen
  return (
    <div className='body'>
     
        <select  className= "inventory-selector" value={display} onChange={handleChange}>
                 <option value="DEFAULT" disabled ={true}>--Select Item Type--</option>
                <option value="Simcards">Simcards</option>
                <option value="Tablets">Tablets</option>

              
        </select>
        

    {tabletsVisible && <Inventory/>}
    {simcardsVisible && <Simcards/>}

    </div>
  )
}

export default InventoryMain