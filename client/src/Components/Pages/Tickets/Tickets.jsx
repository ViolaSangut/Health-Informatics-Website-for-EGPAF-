import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast  } from 'react-toastify';
import moment from 'moment';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";
import * as AiIcons from "react-icons/ai";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as BIIcons from 'react-icons/bi'
import * as RIIcons from 'react-icons/ri';


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
    //   getAllTickets();
    getRecentTickets();
    } else if(window.location.pathname === "/tickets-list/1" || window.location.pathname === "/tickets-list/1/"){
      getUnassignedTickets();
    }  else if(window.location.pathname === "/tickets-list/2" || window.location.pathname === "/tickets-list/2/"){
      getPendingTickets();
    }  else if(window.location.pathname === "/tickets-list/3" || window.location.pathname === "/tickets-list/3/"){
      getResolvedTickets();
    }  else if(window.location.pathname === "/tickets-list/5" || window.location.pathname === "/tickets-list/5/"){
        getAllTickets();
    }

  }

  //Changing Facilities List Title Dynamically 
  const ticketsListPageTitle = () =>{
    if (window.location.pathname === "/tickets-list" || window.location.pathname === "/tickets-list/" || window.location.pathname === "/tickets-list/4" || window.location.pathname === "/tickets-list/4/") {
        return <h2 className='text-center fw-bold mt-2'>Recent Tickets</h2>;
      } else if(window.location.pathname === "/tickets-list/1" || window.location.pathname === "/tickets-list/1/"){
        return <h2 className='text-center fw-bold mt-2'>Unassigned Tickets</h2>;
      }  else if(window.location.pathname === "/tickets-list/2" || window.location.pathname === "/tickets-list/2/"){
        return <h2 className='text-center fw-bold mt-2'>Pending Tickets</h2>;
      }  else if(window.location.pathname === "/tickets-list/3" || window.location.pathname === "/tickets-list/3/"){
        return <h2 className='text-center fw-bold mt-2'>Resolved Tickets</h2>;
      }else if(window.location.pathname === "/tickets-list/5" || window.location.pathname === "/tickets-list/5/"){
        return <h2 className='text-center fw-bold mt-2'>All Tickets</h2>;
    }

  }


   //List All Tickets
   const getAllTickets = () =>{
    privateAxios.get("/tickets"
    )
    .then((response)=>{
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

//List Recent Tickets
const getRecentTickets = () =>{
    privateAxios.get("/tickets/recent"
    )
    .then((response)=>{
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

    const navigateToAllTicketsPage = () =>{
        navigate('/tickets-list/5');
        getAllTickets()
    }

    const navigateToUnsignedTicketsPage = () =>{
        navigate('/tickets-list/1');
        getUnassignedTickets();
    }

    const navigateToPendingTicketsPage = () =>{
        navigate('/tickets-list/2');
        getPendingTickets();
    }

    const navigateToRecentTicketsPage = () =>{
        navigate('/tickets-list/4');
        getRecentTickets();
    }

    useEffect(()=>{
        filterTickets === "all" ? navigateToAllTicketsPage() 
        : filterTickets === "unassigned" ? navigateToUnsignedTicketsPage() 
        : filterTickets === "pending" ? navigateToPendingTicketsPage() 
        : filterTickets === "recent" ? navigateToRecentTicketsPage() 
        :console.log("")
    }, [filterTickets])

//handle click on add ticket button
const handleAddTicketClick = () => {
    navigate('/addticket')
}
const handleToDashboardClick = () => {
    navigate('/tickets')
}

  return (
    <div className='container'>
    
        <div>
           {
            ticketsListPageTitle()
           }
                <div className=" col-sm-5">
            <button onClick={handleAddTicketClick} className='btn btn-outline-success mb-2 col-sm-3'>< BIIcons.BiPlusMedical /></button>
                </div>
                <div className="col-sm-4 offset-10">
            <button onClick={handleToDashboardClick} className='btn btn-outline-warning mb-2'>Tickets DashBoard</button>
                </div>
        </div>
        {/* Search */}
        <div className='form-outline mb-2 mt-2 col-sm-3'>
            {/* <label className="col-sm-2 col-form-label"> Search</label> */}
            <input 
            className='form-control mb-2'
                type="text" 
                value={searchTickets}
                placeholder="Start typing to search for ticket..."
                onChange={(e)=> setSearchTickets(e.target.value)}
            />     
        </div>
    
        {/* Filter */}
        <div className='form-group row mt-2'>
            <label class="fw-bolder">Filter By...</label>
            <div className='col-md-3'>
            <select 
            className="form-select"
            name="isAvailable" value={filterTickets}
                onChange={(e)=>setFilterTickets(e.target.value)}
              
                >
                <option value="recent">Ticket Status</option>
                <option value="pending">Pending</option>
                <option value="unassigned">Unassigned</option>
                <option value="recent">Recent</option>
                <option value="all">All Tickets</option>
          
            </select>      
           </div>
        
           <div className='col-md-2'>
            <select className='form-select' style={{margingLeft: "px"}} name="isAvailable" value={searchTickets}
                onChange={(e)=> setSearchTickets(e.target.value)}>
                <option value="">Day ticket was issued</option>
                <option value={myTodaysDate}>Todays Tickets</option>
                <option value={myYesterdaysDate}>Yesterdays Tickets</option>
            </select> 
        </div>
        </div>
    
        

        {tickets?.length
        ? (
           <div>
             <ReactHTMLTableToExcel
             id="test-table-xls-button"
             className="btn btn-outline-success mb-2 offset-11"
             table="TicketsTable"
             filename="Tickets"
             sheet="Tickets"
             buttonText={<RIIcons.RiFileExcel2Fill/>}
             />
           <div className='table-responsive' >
            <table className='table  table-striped table-hover table-sm' id="TicketsTable">
                <thead  >
                <tr >
                <th >Title </th>
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

                <tbody className='ticketsRow'>
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
                            }else if (ticket.created_date !== null && (moment(ticket.created_date).format('DD-MM-YYYY')).toString().toLowerCase().includes(searchTickets.toString().toLowerCase())) {
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
                                    <td>{(moment(ticket.created_date).format('DD-MM-YYYY'))}</td>
                                 
                                   
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
           </div>
           )
        : <h3 className='table' >No Tickets to display</h3>
        }


      
    </div>
  
)
}

export default Tickets