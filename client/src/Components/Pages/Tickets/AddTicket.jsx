import React, { useState, useEffect, useRef } from 'react'

import { useNavigate, useLocation, useParams, Link} from 'react-router-dom';
import usePrivateAxios from '../../hooks/usePrivateAxios';
// import './AddTicket.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";

const AddTicket = () => {

  const [facilitiesList, setFacilitiesList] = useState("")

  const runUseEffect = useRef(false);

  const privateAxios = usePrivateAxios();

  const { auth } = UseAuth();

    //Getting loggedin's user role, email, firstName & lastName from accessToken.
    const decodedAccessToken = auth?.accessToken
          ? jwt_decode(auth.accessToken)
          : undefined
    const loggedinUserEmail = decodedAccessToken?.email || null;
    const usersFirstName = decodedAccessToken?.firstName || null;
    const usersLastName = decodedAccessToken?.lastName || null;
    const UserRoles = decodedAccessToken?.roles || null;
    const loggedinUserRoles = UserRoles.toString();

    

    const [tickets, setTickets] = useState([]);
    const { id } = useParams();
    const ticket = tickets.find(ticket => (ticket.id).toString() === id);

    const [title, setTitle] = useState("");
    const [facility, setFacility] = useState("");
    const [description, setDescription] = useState("");
    const [creatorsEmail, setCreatorEmail] = useState(loggedinUserEmail);
    const [ticketCreatorsEmail, setTicketCreatorEmail] = useState("");
    const [creatorsFirstName, setCreatorFirstName] = useState(usersFirstName);
    const [creatorsLastName, setCreatorsLastName] = useState(usersLastName);
    const [ticket_status, setTicket_status] = useState("Unassigned");
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [due_date, setDue_date] = useState("");

    const [minDate, setMinDate] = useState(null)

    const min_date  = new Date();

    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
      date();
     }, [])
  
     const date = (()=>{
      setMinDate(moment(min_date).format('YYYY-MM-DD'));
     })

    const navigate = useNavigate();

    //Add Ticket
    const saveTicket = () =>{
      privateAxios.post("/tickets/addticket", {
          title:title, description: description,facility:facility, creatorsEmail: creatorsEmail, creatorsFirstName: creatorsFirstName, creatorsLastName: creatorsLastName, ticket_status: ticket_status, 
          assignee: assignee, priority: priority, due_date: due_date,
        }).then((response)=>{
          console.log("ticket added!");
          toast.success("ticket added successfully")
          navigate('/tickets-list');
          })
          .catch((error)=>{
          console.log(error)
          });
        };

    //Update Ticket
    const updateTicket = () =>{
      privateAxios.put(`/tickets/${id}`, {
        title:title,  description: description, facility:facility, ticket_status: ticket_status, 
        assignee: assignee, priority: priority, due_date: due_date
      }).then((response)=>{
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

      const ticket = {title, facility, creatorsEmail, creatorsFirstName, creatorsLastName, priority, due_date, assignee  }
    //Preventing adding empty fields
      if(ticket.title ==="" || ticket.facility ==="" ){
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
          setTicket_status(ticket.ticket_status);
          setDue_date(ticket.due_date);
          setPriority(ticket.priority);
          setTicketCreatorEmail(ticket.creatorsEmail);
          setDescription(ticket.description);

      }

  }, [ticket])

  useEffect(() => {   
      getAllTickets();
  }, [])
  
  const getAllTickets = () =>{
      privateAxios.get("/tickets")
      .then((response)=>{
          setTickets(response.data);
      })
      .catch((error)=>{
          console.log(error);
      })
  }

   //Adding Condition to change page title dynamically
   const pageTitle = () =>{

      if(id){
          return <h2 className="text-center mt-2 mb-3">View Ticket</h2>
      } 
      else {
          return <h2 className="text-center mt-2 mb-3">Add Ticket</h2>

      }
      
  }
  

 //Get All Facilities
 const getAllFacilities = () =>{
  axios.get("http://localhost:4000/facilities")
  .then((response)=>{
      setFacilities(response.data);
  })
  .catch((error)=>{
      console.log(error);
  })}


    useEffect(()=>{
      if (runUseEffect.current === false || process.env.NODE_ENV !== 'development') {
        getAllFacilities();
      
      }

      return () =>{
        console.log('unmounted')
        runUseEffect.current = true;
      }
     
    }, [])


    const onClickBack = () => { 
      navigate('/tickets-list');
    }

  return (
    <div className='container'>

          <button onClick={onClickBack} className="btn btn-outline-success mt-3" >Back</button>

      <div >
        {
          pageTitle()
        }
      </div>

      <div className="form">
        <div className="form-group row mt-2">
            <label className='col-sm-3 col-form-label'>Title</label>
            <div className="col-md-6">
            <input type="text" className="form-control"  
            value={title} 
            onChange={(e) =>setTitle(e.target.value)}
            //Disabling Update for non admin & super and non-ticket creators
            disabled={!id? false :(loggedinUserRoles === "4" || loggedinUserRoles ==="3") ||((ticketCreatorsEmail === loggedinUserEmail) ) ? false : true}
            />
            </div>
        </div>  

        <div className="form-group row mt-2"  >
            <label className='col-sm-3 col-form-label'>Description</label>
            <div className='col-md-6'>
            <textarea className="form-control"  
            value={description} 
            onChange={(e) =>setDescription(e.target.value)}
            //Disabling Update for non admin & super and non-ticket creators
            disabled={!id? false :(loggedinUserRoles === "4" || loggedinUserRoles ==="3") ||((ticketCreatorsEmail === loggedinUserEmail) ) ? false : true}
            />
        </div> 
        </div>

        <div className="form-group row mt-2">
            <label className='col-sm-3 col-form-label'>Facility</label>
            <div className="col-md-6">
              
              <select  className="form-select"value={facility} onChange ={(e) => setFacility(e.target.value)} disabled={!id? false :(loggedinUserRoles === "4" || loggedinUserRoles ==="3") ||((ticketCreatorsEmail === loggedinUserEmail) ) ? false : true}>
              <option disabled ={true}>--Select  Facility--</option>
                  {
                      facilities.map((facility)=>(<option key={facility.id}text={facility.mflcode}>{facility.facilityname}</option>))
                  }
                 
              </select>
            </div>
        </div> 

        <div className="form-group row mt-2">
            <label className="col-sm-3 col-form-label">Assignee</label>
            <div className="col-md-6">
              <select className="form-select"value={assignee} onChange={(e) =>setAssignee(e.target.value)} 
              disabled={!id? false :(loggedinUserRoles === "4" || loggedinUserRoles ==="3") ||((ticketCreatorsEmail === loggedinUserEmail) ) ? false : true}>
                <option value="">Select</option>
                <option value="Ezra">Ezra</option>
                <option value="Alvin">Alvin</option>
                <option value="Nabel">Nabel</option>
                <option value="Viola">Viola</option>
              </select>
            </div>
        </div> 
        {id? 
         (
        <div className="form-group row mt-2" >
          <label className='col-sm-3 col-form-label'>Status</label>
          <div className='col-md-6'>
            <select className="form-select" value={ticket_status} onChange={(e)=>{setTicket_status(e.target.value)}} 
            disabled={!id? false :(loggedinUserRoles === "4" || loggedinUserRoles ==="3") ||((ticketCreatorsEmail === loggedinUserEmail) ) ? false : true}>
              <option value="">Select</option>
              <option value="Unasigned">Unasigned</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div> 
         ) 
        :(
        <div className="form-group row mt-2" hidden={true}>
          <label className="col-sm-3 col-form-label">Status</label>
          <div className='col-md-6'>
            <select className="form-select"value={ticket_status} onChange={(e)=>{setTicket_status(e.target.value)}} 
            disabled={!id? false :(loggedinUserRoles === "4" || loggedinUserRoles ==="3") ||((ticketCreatorsEmail === loggedinUserEmail) ) ? false : true}
            >
              {/* <option value="">Select</option> */}
              <option value="Unasigned">Unasigned</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div> 
        )
        }
       
        <div className="form-group row mt-2">
            <label className='col-sm-3 col-form-label'>Priority</label>
            <div className='col-md-6'>
              <select className="form-select" value={priority} onChange={(e)=>{setPriority(e.target.value)}} disabled={!id? false :(loggedinUserRoles === "4" || loggedinUserRoles ==="3") ||((ticketCreatorsEmail === loggedinUserEmail) ) ? false : true}
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
        </div> 

        <div className="form-group row mt-2">
        <label className='col-sm-3 col-form-label'>Due Date: </label>
        <div className='col-md-6'>
                      <input type="date" name="due_date" className="form-control"
                           value={(moment(due_date).format('YYYY-MM-DD'))} 
                       onChange={(e)=>{setDue_date(e.target.value)}}
                       min={minDate}  
                       
                       disabled={!id? false :(loggedinUserRoles === "4" || loggedinUserRoles ==="3") ||((ticketCreatorsEmail === loggedinUserEmail) ) ? false : true}
                      />                
        </div>  
        </div>
       
        <div className="mt-3 offset-sm-3">
        {
          //Adding Ticket
          !id?
          <button to="" className="btn btn-success col-md-3 m-2"  onClick={(e) => saveorUpdateTicket(e)}> Add</button>

          //Checking if loggedin user is the creator of the ticket for update permission
          :ticketCreatorsEmail === loggedinUserEmail?
          <button to="" className="btn btn-warning col-md-3 m-2"  onClick={(e) => saveorUpdateTicket(e)}> {id ? <>Update</> :<>Add</>}</button>

          //Allowing Admin and superuser to update all tickets
          :(loggedinUserRoles === "4" || loggedinUserRoles ==="3") ?
          <button to="" className="btn btn-warning col-md-3 m-2" onClick={(e) => saveorUpdateTicket(e)}> {id ? <>Update</> :<>Add</>}</button>
          : <></>
        }                      
          </div>
      </div>
  </div>	
  )
}


export default AddTicket