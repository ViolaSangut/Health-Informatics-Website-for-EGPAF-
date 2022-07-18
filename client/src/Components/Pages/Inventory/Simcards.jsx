import React,{useState, useEffect, } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { toast  } from 'react-toastify';
import "./Inventory.css";
import usePrivateAxios from '../../hooks/usePrivateAxios';
import * as AiIcons from "react-icons/ai";



const Simcards = () => {


 const navigate= useNavigate();

    //declaring state for the inventory list upon loading the page
  const [cards, setCards] = useState([]);
  const[searchCard, setSearchCard] = useState("")
  const private_axios = usePrivateAxios();

    useEffect(() => {

        getAllCards();
      
    }, [])



    //handleClick
    const handleClick = () => {
        navigate('/addSimcards')

    }

    //List all cards in the inventory
    const getAllCards = () =>{
        private_axios.get("/simcards")
        .then((response)=>{
            // console.log(response.data)
            setCards(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    //delete cards from inventory
    const deleteCard = (id) =>{
        if(window.confirm("Are you sure you want to delete this card?")){
            private_axios.delete(`/simcards/delete/${id}`)
        .then((response)=>{
            setCards(cards.filter((card)=>{
                return card.id !== id;
            }));
            toast.success("Card deleted successfully");
            // console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        });
        }
    };


    //render tables on screen
    return(
         <div>
            <div>
      <h1 className="header">Simcards Inventory</h1>
      </div>
                <input className="searchbox"
                placeholder='Search for Simcard'
                value={searchCard}
                onChange={(e)=> setSearchCard(e.target.value)}
                ></input>

                <button onClick={handleClick} className="addnewinventorybtn">Add New Simcard</button>
            <div>

        </div>
        <div className='table'>
            <table className="table_content">
                <thead className="thead">
                    <tr>
                    <th>Serial</th>
                    <th>Phone Number</th>
                    <th>IMEI</th>
                    <th>PUK</th>
                    <th>PIN</th>
                    <th>Facility</th>
                    <th>Tablet IMEI</th>
                    <th>Action</th>
                    </tr>
                </thead>
    <tbody className="tbody">
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
                        }else if (card.PhoneAssigned !== null && card?.PhoneAssigned.toLowerCase().includes(searchCard?.toLowerCase())) {
                            return card;
                        }
                    }
                    )
            .map (card => 
                <tr key = {card.id}
                onDoubleClick={
                            () => {
                            navigate(`/addSimcards/${card.id}`)
                        }
                    }
                    >

                    <td> {card.id} </td>
                    <td> {card.PhoneNumber} </td>
                    <td> {card.IMEI} </td>
                    <td> {card.PUK} </td>
                    <td> {card.PIN} </td>
                    <td> {card.Facility} </td>
                    <td> {card.PhoneAssigned} </td>

                            <td> <Link to = '' className = "btn btn-danger" onClick = {() => deleteCard(card.id)}
                                    style = {{marginLeft:"10px"}}> <AiIcons.AiFillDelete/> </Link>
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