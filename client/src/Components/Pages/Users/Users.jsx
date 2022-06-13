import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Users.css';
import { toast  } from 'react-toastify';

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        getAllUsers();
      
    }, [])

    //List 
    const getAllUsers = () =>{
        axios.get("http://localhost:4000/users")
        .then((response)=>{
            console.log(response.data)
            setUsers(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    //delete
    const deleteUser = (id) =>{
        if(window.confirm("Are you sure you want to delete the user?")){
            axios.delete(`http://localhost:4000/users/delete/${id}`)
        .then((response)=>{
            setUsers(users.filter((user)=>{
                return user.id != id;
            }));
            toast.success("User deleted successfully");
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        });
        }
        
    };

  return (
    <div className='container'> 
    <div className='users-title'>
        <h2 className='text-center'>Users List</h2>  
        <Link to = '/add-user' className='btn btn-success'   style = {{marginLeft:"30px"}}>Add user</Link>

    </div>
    
    <div className='table'>
    <table className='table_content'>
    <thead>
        <th>User ID </th>
        <th>First Name</th>
        <th>Last Name</th> 
        <th>Role</th> 
        <th>Email</th> 
        <th> Actions</th>         

    </thead>

    <tbody>
     {
        users.map (
            user => 
                <tr key = {user.id}>

                    <td> {user.id} </td>
                    <td> {user.firstName} </td>
                    <td> {user.lastName} </td>
                    <td> {user.role} </td>
                    <td> {user.email} </td>

                      
                    <td>
                       
                       <Link to = {`/edit-user/${user.id}`} className='btn btn-info'>Update</Link>
                    
                       <Link to = "" className = "btn btn-danger" onClick = {() => deleteUser(user.id)}
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

export default Users