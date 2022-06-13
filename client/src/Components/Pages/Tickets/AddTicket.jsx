import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import './AddTicket.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddTicketComponent = () => {

    const [title, setTitle] = useState("");
    const [facility, setFacility] = useState("");
    const [creator, setCreator] = useState("");
    const [ticket_status, setTicket_status] = useState("");
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [due_date, setDue_date] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const getTicketById = ((id)=>{
        axios.get(`http://localhost:4000/tickets/${id}`)
        .then((response)=>{
            setTitle(response.data.title);
            setFacility(response.data.facility);
            setCreator(response.data.creator);
        })
        .catch((error)=>{
            console.log(error);
        });
    });

    const saveTicket = () =>{
        axios.post("http://localhost:4000/tickets/addticket", {
          title:title, facility:facility, creator: creator,
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

    const saveorUpdateTicket = (e) =>{
        e.preventDefault();

        const ticket = {title, facility, creator }
      //Preventing adding empty fields
        if(ticket.title ==="" || ticket.facility ==="" || ticket.creator ===""){
            alert("All the fields are mandatory!");
         return;

        } else{
          saveTicket();
        }
  
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
        <div>
                <br />
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {
                                pageTitle()
                            }
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Title: </label>
                                        <input placeholder='title' name="title" className="form-control"
                                            value={title} 
                                            // storing form data values in the properties onChange. event.target.value retrieves / access value of whatever input it was called on.
                                            onChange={(e) =>setTitle(e.target.value)}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Facility: </label>
                                        <input placeholder='facility' name="facility" className="form-control"
                                            value={facility} 
                                            onChange={(e) =>setFacility(e.target.value)}
                                        />
                                    </div>

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

                                    <div className='form-group'>
                                        <label>Priority: </label>
                                        <input placeholder='priority' name="priority" className="form-control"
                                            value={priority} 
                                            onChange={(e) =>setPriority(e.target.value)}
                                        />
                                    </div>   

                            

                                    <br/>

                                    {/* <button className='btn btn-info' onClick={(e) => saveorUpdateTicket(e)}>Save</button> */}
                                    <Link to="" className="btn btn-info" style={{marginLeft: "10px"}} onClick={(e) => saveorUpdateTicket(e)}>Save</Link>
                                    <Link to="/tickets-list" className="btn btn-danger" style={{marginLeft: "10px"}}>Cancel</Link>
                                </form>       
                            </div>
                        </div>
                    </div>      
                </div> 
            </div>
    )
}


export default AddTicketComponent
