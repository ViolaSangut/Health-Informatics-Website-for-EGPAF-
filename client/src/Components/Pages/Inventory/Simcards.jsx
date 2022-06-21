import React,{useState, useEffect, } from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom';
import { toast  } from 'react-toastify';
import "./Inventory.css";









const Simcards = () => {

let PhoneNumber, IMEI,PUK, PIN, Facility

 const navigate= useNavigate();

    //declaring state for the inventory list upon loading the page
  const [cards, setCards] = useState([]);
  const[searchCard, setSearchCard] = useState("")

    useEffect(() => {

        getAllCards();
      
    }, [])

    //handleClick
    const handleClick = () => {
        navigate('/addSimcards')

    }

   


    //List all cards in the inventory
    const getAllCards = () =>{
        axios.get("http://localhost:4000/simcards")
        .then((response)=>{
            console.log(response.data)
            setCards(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    //delete cards from inventory
    const deleteCard = (id) =>{
        if(window.confirm("Are you sure you want to delete this card?")){
            axios.delete(`http://localhost:4000/simcards/delete/${id}`)
        .then((response)=>{
            setCards(cards.filter((card)=>{
                return card.id !== id;
            }));
            toast.success("Card deleted successfully");
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        });
        }
    };


    return(
        <div>
            <div>
                <input 
                placeholder='Search for Simcard'
                value={searchCard}
                onChange={(e)=> setSearchCard(e.target.value)}
                />
                <button onClick={handleClick}>Add New Simcard</button>
            </div>
        <div className='table'>
            <table className="table_content">
                <thead className="table-header">
                    <th>Serial</th>
                    <th>Phone Number</th>
                    <th>IMEI</th>
                    <th>PUK</th>
                    <th>PIN</th>
                    <th>Facility</th>
                    <th>Actions</th>
                    <th/>
                    <th/>
                </thead>
    <tbody className="">
     {
       
          cards.filter((card)=> {
                        if(searchCard === ""){
                           return cards;
                        } 
                        else if (card.PhoneNumber !== null && card.PhoneNumber?.toLowerCase().includes(searchCard?.toLowerCase())) {
                            return card;
                        }else if (card.IMEI !== null && card.IMEI?.toLowerCase().includes(searchCard?.toLowerCase())) {
                            return card;
                        }else if (card.PUK !== null && card.PUK?.toLowerCase().includes(searchCard?.toLowerCase())) {
                            return card;
                        }else if (card.PIN !== null && card.PIN?.toLowerCase().includes(searchCard?.toLowerCase())) {
                            return card;
                        }else if (card.Facility !== null && card?.Facility.toLowerCase().includes(searchCard?.toLowerCase())) {
                            return card;
                        }
                    }
                    )
            .map (card => 
                <tr key = {card.id}>

                    <td> {card.id} </td>
                    <td> {card.PhoneNumber} </td>
                    <td> {card.IMEI} </td>
                    <td> {card.PUK} </td>
                    <td> {card.PIN} </td>
                    <td> {card.Facility} </td>
                
                    <td>
                            <Link to = {`/addSimcards/${card.id}`} className='btn btn-info' > Update</Link>
                            </td>
                            <td> <Link to = '' className = "btn btn-danger" onClick = {() => deleteCard(card.id)}
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
export default Simcards;