import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import './AddTicket.css';

import { toast } from 'react-toastify';



import moment from 'moment';


import facilities from '../../../Resources/facilities/facilities.json'




const AddTicketComponent = () => {

    const [tickets, setTickets] = useState([]);
    const { id } = useParams();
    const ticket = tickets.find(ticket => (ticket.id).toString() === id);

    const [title, setTitle] = useState("");
    const [facility, setFacility] = useState("");
    const [creator, setCreator] = useState("");
    const [ticket_status, setTicket_status] = useState("Unassigned");
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [due_date, setDue_date] = useState("");

    const [minDate, setMinDate] = useState(null)

    const min_date  = new Date();
    
    
   useEffect(() => {
    date();
   }, [])

   const date = (()=>{
    setMinDate(moment(min_date).format('YYYY-MM-DD'));
   })

 


    const navigate = useNavigate();

    const facilitiesList = facilities;
   

    //Add Ticket
    const saveTicket = () =>{
        axios.post("http://localhost:4000/tickets/addticket", {
            title:title, facility:facility, creator: creator, ticket_status: ticket_status, 
            assignee: assignee, priority: priority, due_date: due_date,
        }).then((response)=>{
        console.log(response.data)
        console.log("ticket inserted!");
        toast.success("ticket inserted successfully")
        navigate('/tickets-list');
    })
    .catch((error)=>{
      console.log(error)
    });
    };

      //Update Ticket
      const updateTicket = () =>{
        axios.put(`http://localhost:4000/tickets/${id}`, {
          title:title, facility:facility, creator: creator, ticket_status: ticket_status, 
          assignee: assignee, priority: priority, due_date: due_date
        }).then((response)=>{
        console.log(response.data)
        console.log("ticket updated!");
        toast.success("ticket updated successfully")
        navigate('/tickets-list');
        })
        .catch((error)=>{
        console.log(error)
        });
      };

    const saveorUpdateTicket = (e) =>{
        e.preventDefault();

        const ticket = {title, facility, creator }
      //Preventing adding empty fields
        if(ticket.title ==="" || ticket.facility ==="" || ticket.creator ===""){
            alert("All the fields are mandatory!");
         return;

        } else{
            if (id) {
                updateTicket();
            } else{
                saveTicket();

            }
        
        }

    }

    useEffect(() => {
        if (ticket) {
            setTitle(ticket.title);
            setFacility(ticket.facility);
            setAssignee(ticket.assignee);
            setCreator(ticket.creator);
            setTicket_status(ticket.ticket_status);
            setDue_date(ticket.due_date);
            setPriority(ticket.priority);

        }

    }, [ticket])

    useEffect(() => {   
        getAllTickets();
    }, [])
    
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

     //Adding Condition to change page title dynamically
     const pageTitle = () =>{

        if(id){
            return <h3 className="text-center">Update Ticket</h3>
        } 
        else {
            return <h3 className="text-center">Add Ticket</h3>

        }
        
    }

    return (
        <div align="middle">
            
        <section>
            {
        <>
              {
                pageTitle()
              }
            
            <div className='card-body'>
             <form>          
                     <label>Title: </label>
                      <input placeholder='title' name="title" className="form-control"
                       value={title} 
                        // storing form data values in the properties onChange. event.target.value retrieves / access value of whatever input it was called on.
                        onChange={(e) =>setTitle(e.target.value)}
                        />                
                        <label>Facility</label>
                        <select  onChange ={(e) => setFacility(e.target.value)}>
                            <option selected disabled ="false">Search</option>
                            {
                                facilitiesList.Facilitynames.map((facility)=>(<option key={facility.no}text={facility.mfl}>{facility.facility}</option>))
                            }
                        </select>

                        <div className='form-group'>
                        <label>Creator: </label>
                        <input placeholder='creator' name="creator" className="form-control"
                         value={creator} 
                         onChange={(e) =>setCreator(e.target.value)}
                        />
                         </div> 

                        <div className='form-group'>
                        <label>Asignee: </label>
                        <input placeholder='assignee' name="assignee" className="form-control"
                         value={assignee} 
                         onChange={(e) =>setAssignee(e.target.value)}
                        />
                         </div>    

                        {  id ? 
                         (
                          
                          <div  className='form-group' >
                          <label>Status</label>
                          <select value={ticket_status} onChange={(e)=>{setTicket_status(e.target.value)}} >
                              <option value="Unasigned">Unasigned</option>
                              <option value="Pending">Pending</option>
                              <option value="Resolved">Resolved</option>
                          </select>
                          </div>
                          
                        ) : (
                          <div  className='form-group' hidden= 'true'>
                          <label>Status</label>
                          <select value={ticket_status} onChange={(e)=>{setTicket_status(e.target.value)}} >
                              <option value="Unasigned">Unasigned</option>
                              <option value="Pending">Pending</option>
                              <option value="Resolved">Resolved</option>
                          </select>
                          </div>
                        )
                        
                        
                        }   

                    
 

                     <div  className='form-group'>
                     <label>Priority</label>
                     <select value={priority} onChange={(e)=>{setPriority(e.target.value)}} >
                         <option value="Low">Low</option>
                         <option value="Medium">Medium</option>
                         <option value="High">High</option>
                         <option value="Urgent">Urgent</option>
                         <option value="Critical">Critical</option>
                     </select>
                     </div>

                     <div  className='form-group'>
                     
                     </div>


                    
                         <div className='form-group'>
                        <label>Due Date: </label>
                        <input type="date" name="due_date" className="form-control"
                             value={(moment(due_date).format('YYYY-MM-DD'))} 
                         onChange={(e)=>{setDue_date(e.target.value)}}
                         min={minDate}                         
                        />                           
                         </div>
                         <br/>                          
                         <Link to="" className="btn btn-info" style={{width: "50%", marginLeft: "20%", marginBottom: "2%"}} onClick={(e) => saveorUpdateTicket(e)}>Submit</Link>
                         <Link to="/tickets-list" className="btn btn-danger" style={{width: "50%", marginLeft: "20%", marginBottom: "0%"}}>Cancel</Link>
            </form>
            </div>
         </>
            }
           
        
        </section>
        </div>
    )
}

export default AddTicketComponent
