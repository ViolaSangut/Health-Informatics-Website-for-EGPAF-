import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast  } from 'react-toastify';
import './Tickets.css';
import moment from 'moment';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";
import * as AiIcons from "react-icons/ai";

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
    

    //Getting loggedin's user details from accessToken.
    const decodedAccessToken = auth?.accessToken
          ? jwt_decode(auth.accessToken)
          : undefined
    const userEmail = decodedAccessToken?.email || null;
    const UserRoles = decodedAccessToken?.roles || null;
    const loggedinUserRoles = UserRoles.toString();

    //Listing Tickets By Status
  const filterByTicketStatus = () =>{
    if (window.location.pathname === "/tickets-list" || window.location.pathname === "/tickets-list/" || window.location.pathname === "/tickets-list/4" || window.location.pathname === "/tickets-list/4/") {
      getAllTickets();
    } else if(window.location.pathname === "/tickets-list/1" || window.location.pathname === "/tickets-list/1/"){
      getUnassignedTickets();
    }  else if(window.location.pathname === "/tickets-list/2" || window.location.pathname === "/tickets-list/2/"){
      getPendingTickets();
    }  else if(window.location.pathname === "/tickets-list/3" || window.location.pathname === "/tickets-list/3/"){
      getResolvedTickets();
    }

  }

  //Changing Facilities List Title Dynamically 
  const ticketsListPageTitle = () =>{
    if (window.location.pathname === "/tickets-list" || window.location.pathname === "/tickets-list/" || window.location.pathname === "/tickets-list/4" || window.location.pathname === "/tickets-list/4/") {
        return <h2 className='text-center'>All Tickets</h2>;
      } else if(window.location.pathname === "/tickets-list/1" || window.location.pathname === "/tickets-list/1/"){
        return <h2 className='text-center'>Unassigned Tickets</h2>;
      }  else if(window.location.pathname === "/tickets-list/2" || window.location.pathname === "/tickets-list/2/"){
        return <h2 className='text-center'>Pending Tickets</h2>;
      }  else if(window.location.pathname === "/tickets-list/3" || window.location.pathname === "/tickets-list/3/"){
        return <h2 className='text-center'>Resolved Tickets</h2>;
      }

  }


   //List All Tickets
   const getAllTickets = () =>{
    privateAxios.get("/tickets"
    )
    .then((response)=>{
        console.log(response.data)
        setTickets(response.data);
        console.log(tickets)
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

 //List Resolved Tickets
 const getResolvedTickets = () =>{
    privateAxios.get("/tickets/Resolved"
    )
    .then((response)=>{
        console.log(response.data)
        setTickets(response.data);
        console.log(tickets)
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

 //List Pending Tickets
 const getPendingTickets = () =>{
    privateAxios.get("/tickets/pending"
    )
    .then((response)=>{
        console.log(response.data)
        setTickets(response.data);
        console.log(tickets)
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

 //List Unassigned Tickets
 const getUnassignedTickets = () =>{
    privateAxios.get("/tickets/unassigned"
    )
    .then((response)=>{
        console.log(response.data)
        setTickets(response.data);
        console.log(tickets)
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

    
    useEffect(() => {
        filterByTicketStatus();
   
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
           {
            ticketsListPageTitle()
           }

            <Link to = '/addticket' className='btn btn-primary mb-2'>Add Ticket</Link>
            <Link to = '/tickets' className='btn btn-primary mb-2' style={{marginLeft: "3%"}}>Tickets DashBoard</Link>
        </div>
        {/* Date Filter */}
        <div className='tickets_date_filter'>
            <select name="isAvailable" value={searchTickets}
                onChange={(e)=> setSearchTickets(e.target.value)}>
                <option value="">All</option>
                <option value={myTodaysDate}>Todays Tickets</option>
                <option value={myYesterdaysDate}>Yesterdays Tickets</option>
            </select>

            
        </div>
        {/* Search */}
        <div className='tickets_search_bar'>
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
           <div className='ticketsTable'>
            <table className='tickets_table_content'>
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
                <th> Action</th>      
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
                                   
                                    {    //Enabling only creators of the ticket, Admins and Super_Users to update & delete
                                         (loggedinUserRoles === "4" || loggedinUserRoles ==="3") ||ticket.creatorsEmail === userEmail ?
                                        <td> <Link to = '' className = "btn btn-danger" onClick = {() => deleteTicket(ticket.id)}
                                            style = {{marginLeft:"10px"}}> <AiIcons.AiFillDelete/>
                                            </Link>
                                        </td>
                                        : <td>
                                             <Link to = '' className = "btn btn-secondary"
                                               style = {{marginLeft:"10px"}}> <AiIcons.AiFillDelete/>
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