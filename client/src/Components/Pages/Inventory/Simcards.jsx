import React,{useState, useEffect, } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { toast  } from 'react-toastify';
import "./Inventory.css";
import usePrivateAxios from '../../hooks/usePrivateAxios';
import * as AiIcons from "react-icons/ai";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as BIIcons from 'react-icons/bi'
import * as RIIcons from 'react-icons/ri';





const Simcards = () => {


 const navigate= useNavigate();

    //declaring state for the inventory list upon loading the page
  const [cards, setCards] = useState([]);
  const[searchCard, setSearchCard] = useState ("")
  const private_axios = usePrivateAxios();

    useEffect(() => {

        getAllCards();
      
    }, [])



    //handleClick on add simcard button
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


    //render table on screen
    return(
         <div>
            <div>
      <h3 className="text-center mb-3 mt-5 fw-bold">Simcards Inventory</h3>
      </div>
      <div className='form-outline mb-4 col-sm-3'>
                <input className="form-control mb-3 "
                placeholder='Search for Simcard'
                value={searchCard}
                onChange={(e)=> setSearchCard(e.target.value)}
                ></input>
                </div>
                <div>
            <div className='form-group row mt-2 mb-1'>
                <button onClick={handleClick} className="addbtn col-sm-1 btn-outline-warning">< BIIcons.BiPlusMedical /></button>
            <div className='col-md-6'>
        <ReactHTMLTableToExcel
                    id="tablets-download-button"
                    className="btn btn-outline-success"
                    table="table-to-xls"
                    filename = "Simcard-List"
                    sheet="tablexls"
                    buttonText={<RIIcons.RiFileExcel2Fill/>}/>
        </div>
        </div>
        </div>
        <div >
            <table className="table mt-3 table-striped table-hover table-sm" id="table-to-xls">
                <thead >
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
    <tbody >
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
                                    style = {{marginLeft:"10px"}}> <AiIcons.AiFillDelete/>   </Link>
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