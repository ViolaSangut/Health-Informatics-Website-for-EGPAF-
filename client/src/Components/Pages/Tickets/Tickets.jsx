import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast  } from 'react-toastify';
import './Tickets';
import moment from 'moment';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [ticketsDateCreated, setTicketsDateCreated] = useState([]);
    const navigate = useNavigate();
    const [searchTickets, setSearchTickets] = useState("");


    useEffect(() => {

        getAllTickets();
        test();
    }, [])

    const test = () =>{
        axios.get("http://localhost:4000/tickets")
        .then((response)=>{
            console.log(response.data)
            setTicketsDateCreated(response.data)
            
          
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    //List 
    const getAllTickets = () =>{
        axios.get("http://localhost:4000/tickets")
        .then((response)=>{
            console.log(response.data)
            setTickets(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    //delete
    const deleteTicket = (id) =>{
        if(window.confirm("Are you sure you want to delete the Ticket?")){
            axios.delete(`http://localhost:4000/tickets/delete/${id}`)
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
   
    <div className='search_bar'>
          <label style={{margin: "1%"}}>Search</label>
          <input 
            type="text" 
            value={searchTickets}
            onChange={(e)=> setSearchTickets(e.target.value)}
          />     
    </div>

    <div className='table'>
        <table className='table_content'>
            <thead>
        
            <th>Title </th>
            <th>Facility</th> 
            <th>Creator</th> 
            <th>Status</th> 
            <th>Assignee</th> 
            <th>Priority</th> 
            <th>Due Date</th> 
            <th>Date Created</th> 
            <th> update</th>  
            <th> Remove</th>      

            </thead>

            <tbody>
                    {
                    tickets.filter((ticket)=>{
                        if(searchTickets == ""){
                            return ticket;
                        } else if (ticket.title !== null && ticket.title.toLowerCase().includes(searchTickets.toLowerCase())) {
                            return ticket;
                        }else if (ticket.facility !== null && ticket.facility.toLowerCase().includes(searchTickets.toLowerCase())) {
                            return ticket;
                        }else if (ticket.creator !== null && ticket.creator.toLowerCase().includes(searchTickets.toLowerCase())) {
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
                            <tr key = {ticket.id}>

                                <td> {ticket.title} </td>
                                <td> {ticket.facility} </td>
                                <td> {ticket.creator} </td>
                                <td>{ticket.ticket_status}</td>
                                <td>{ticket.assignee}</td>
                                <td>{ticket.priority}</td>
                                <td>{(moment(ticket.due_date).format('DD-MM-YYYY'))}</td>
                                <td>{(moment(ticket.createdAt).format('DD-MM-YYYY'))}</td>
                                
                                <td>
                                <Link to = {`/edit-ticket/${ticket.id}`} className='btn btn-info'> Update</Link>
                                </td>
                                <td> <Link to = '' className = "btn btn-danger" onClick = {() => deleteTicket(ticket.id)}
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

export default Tickets