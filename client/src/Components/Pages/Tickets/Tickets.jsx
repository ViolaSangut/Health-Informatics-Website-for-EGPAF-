import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast  } from 'react-toastify';
import './Tickets';
import moment from 'moment';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [ticketsDateCreated, setTicketsDateCreated] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTickets, setSearchTickets] = useState("");
    const [filterTickets, setFilterTickets] = useState("");
    const privateAxios = usePrivateAxios();

    const todaysDate = new Date();

    const myTodaysDate = moment(todaysDate).format('DD-MM-YYYY');
    

    let yesterdaysDate = new Date();
    yesterdaysDate.setDate(yesterdaysDate.getDate() - 1);

    let myYesterdaysDate = moment(yesterdaysDate).format('DD-MM-YYYY')

    const { auth } = UseAuth();

    //Getting loggedin's user email from accessToken.
    const decodedAccessToken = auth?.accessToken
          ? jwt_decode(auth.accessToken)
          : undefined
    const userEmail = decodedAccessToken?.email || null;


    useEffect(() => {
 
        //List 
        const getAllTickets = () =>{
            privateAxios.get("/tickets"
            )
            .then((response)=>{
                console.log(response.data)
                setTickets(response.data);
            })
            .catch((error)=>{
                console.log(error);
                if(error.message === "Request failed with status code 401"){
                    navigate('/unauthorized', { state: { from: location }, replace: true });
                } else{
                navigate('/', { state: { from: location }, replace: true });
                }
            })
        }

        getAllTickets();

    }, [])

    
    //delete
    const deleteTicket = (id) =>{
        if(window.confirm("Are you sure you want to delete the Ticket?")){
            privateAxios.delete(`/tickets/delete/${id}`)
        .then((response)=>{
            setTickets(tickets.filter((ticket)=>{
                return ticket.id != id;
            }));
            toast.success("Ticket deleted successfully");
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        });
        }
        
    };


  return (
    <div >
    
        <div style={{textAlign: "center"}}>
            <h2 className='text-center'>Tickets</h2>  

            <Link to = '/addticket' className='btn btn-primary mb-2'>Add Ticket</Link>
        </div>
        {/* Date Filter */}
        <div className='date_filter'>
            <select name="isAvailable" value={searchTickets}
                onChange={(e)=> setSearchTickets(e.target.value)}>
                <option value="">All</option>
                <option value={myTodaysDate}>Todays Tickets</option>
                <option value={myYesterdaysDate}>Yesterdays Tickets</option>
            </select>
        </div>
        {/* Search */}
        <div className='search_bar'>
            <label style={{margin: "1%"}}>Search</label>
            <input 
                type="text" 
                value={searchTickets}
                onChange={(e)=> setSearchTickets(e.target.value)}
            />     
        </div>

        {tickets?.length
        ? (
           <>
           <div className='table'>
            <table className='table_content'>
                <thead>
                <tr>
                <th>Title </th>
                <th>Facility</th> 
                <th>Creator</th> 
                <th>Creator's Email</th> 
                <th>Status</th> 
                <th>Assignee</th> 
                <th>Priority</th> 
                <th>Due Date</th> 
                <th>Date Created</th> 
                {/* <th> update</th>   */}
                <th> Remove</th>      
                </tr>
                </thead>

                <tbody>
                        {
                        tickets.filter((ticket)=>{
                            if(searchTickets === ""){
                                return ticket;
                            } else if (ticket.title !== null && ticket.title.toLowerCase().includes(searchTickets.toLowerCase())) {
                                return ticket;
                            }else if (ticket.facility !== null && ticket.facility.toLowerCase().includes(searchTickets.toLowerCase())) {
                                return ticket;
                            }else if (ticket.creatorsFirstName !== null && ticket.creatorsFirstName.toLowerCase().includes(searchTickets.toLowerCase())) {
                                return ticket;
                            }else if (ticket.creatorsLastName !== null && ticket.creatorsLastName.toLowerCase().includes(searchTickets.toLowerCase())) {
                                return ticket;
                            }else if (ticket.ticket_status !== null && ticket.ticket_status.toLowerCase().includes(searchTickets.toLowerCase())) {
                                return ticket;
                            }else if (ticket.assignee !== null && ticket.assignee.toLowerCase().includes(searchTickets.toLowerCase())) {
                                return ticket;
                            }else if (ticket.priority !== null && ticket.priority.toLowerCase().includes(searchTickets.toLowerCase())) {
                                return ticket;
                            }else if (ticket.due_date !== null && (moment(ticket.due_date).format('DD-MM-YYYY')).toString().toLowerCase().includes(searchTickets.toString().toLowerCase())) {
                                return ticket;
                            }else if (ticket.createdAt !== null && (moment(ticket.createdAt).format('DD-MM-YYYY')).toString().toLowerCase().includes(searchTickets.toString().toLowerCase())) {
                                return ticket;
                            }
                        }).map (
                            ticket => 
                                <tr key = {ticket.id}
                                    onDoubleClick={()=>{
                                        navigate(`/edit-ticket/${ticket.id}`)
                                    }}
                                >

                                    <td> {ticket.title} </td>
                                    <td> {ticket.facility} </td>
                                    <td> {ticket.creatorsFirstName} {ticket.creatorsLastName} </td>
                                    <td>{ticket.creatorsEmail}</td>
                                    <td>{ticket.ticket_status}</td>
                                    <td>{ticket.assignee}</td>
                                    <td>{ticket.priority}</td>
                                    <td>{(moment(ticket.due_date).format('DD-MM-YYYY'))}</td>
                                    <td>{(moment(ticket.createdAt).format('DD-MM-YYYY'))}</td>
                                   
                                    {
                                        ticket.creatorsEmail === userEmail &&
                                        <td> <Link to = '' className = "btn btn-danger" onClick = {() => deleteTicket(ticket.id)}
                                            style = {{marginLeft:"10px"}}> X 
                                            </Link>
                                        </td>
                                    }
                                    
                        </tr>
                            
                        )    

                            
                    }
            
                </tbody>

            </table>
        
           </div>
           </>
           )
        : <h3 className='table' >No Tickets to display</h3>
        }


      
    </div>
  
)
}

export default Tickets