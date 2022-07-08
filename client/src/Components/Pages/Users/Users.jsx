import React,{useState, useEffect, useContext} from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom';
import './Users.css';
import { toast  } from 'react-toastify';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const privateAxios = usePrivateAxios();

    const { auth } = UseAuth();

    //Getting loggedin's user roles, email from accessToken.
    const decodedAccessToken = auth?.accessToken
          ? jwt_decode(auth.accessToken)
          : undefined
    const userRoles = decodedAccessToken?.roles || null;
    const userEmail = decodedAccessToken?.email || null;

    useEffect(() => {
        
        //List 
        const getAllUsers = () =>{
            privateAxios.get('/users')
            .then((response)=>{
            setUsers(response.data);
            })
            .catch((error)=>{
                console.log(error);
    
                console.log(error.message)
                    navigate('/unauthorized');
            })
        }
        getAllUsers();
   
    }, [])
  
    //delete
    const deleteUser = (id) =>{
        if(window.confirm("Are you sure you want to delete the user?")){
            privateAxios.delete(`/users/delete/${id}`)
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
     <tr>
        <th>User ID </th>
        <th>First Name</th>
        <th>Last Name</th> 
        <th>Role</th> 
        <th>Email</th> 
        <th>Actions</th>         
     </tr>
    </thead>

    <tbody>
     {
        users.map (
            user => 
                <tr key = {user.id}>

                    <td> {user.id} </td>
                    <td> {user.firstName} </td>
                    <td> {user.lastName} </td>
                    <td> {user.Role.role} </td>
                    <td> {user.email} </td>         
                    
                    {
                      userEmail !== user.email &&
                      
                        <td>
                        <Link to = {`/edit-user/${user.id}`} className='btn btn-info'>Update</Link> 
                        <Link to = "" className = "btn btn-danger" onClick = {() => deleteUser(user.id)}
                               style = {{marginLeft:"10px"}}> 
                               X 
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
}

export default Users