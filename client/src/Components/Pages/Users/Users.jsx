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
    const [searchUser, setSearchUser] = useState("");

    const { auth } = UseAuth();

    //Getting loggedin's user roles, email from accessToken.
    const decodedAccessToken = auth?.accessToken
          ? jwt_decode(auth.accessToken)
          : undefined
    const UserRoles = decodedAccessToken?.roles || null;
    const loggedinUserRoles = UserRoles.toString();
    const loggedinUserEmail = decodedAccessToken?.email || null;

    useEffect(() => {

        console.log(loggedinUserRoles)
        
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

    {/* Search */}
    <div className='search_bar'>
            <label style={{margin: "1%"}}>Search</label>
            <input 
                type="text" 
                value={searchUser}
                onChange={(e)=> setSearchUser(e.target.value)}
            />     
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
        users.filter((user)=>{
            if(searchUser === ""){
                return user;
            }
            else if (user.firstName !== null && user.firstName.toLowerCase().includes(searchUser.toLowerCase())) {
            return user;
            }
            else if (user.lastName !== null && user.lastName.toLowerCase().includes(searchUser.toLowerCase())) {
                return user;
            }
            else if (user.Role.role !== null && user.Role.role.toLowerCase().includes(searchUser.toLowerCase())) {
                return user;
            }
            else if (user.email !== null && user.email.toLowerCase().includes(searchUser.toLowerCase())) {
                return user;
            }
        }
        ).map (
            user => 
                <tr key = {user.id}>

                    <td> {user.id} </td>
                    <td> {user.firstName} </td>
                    <td> {user.lastName} </td>
                    <td> {user.Role.role} </td>
                    <td> {user.email} </td>         
                    
                    {
                    //Denying loggedin user right to delete himself/herself 
                    loggedinUserEmail === user.email ?
                        <td>
                        <Link to = {`/edit-user/${user.id}`} className='btn btn-info'>Update</Link>
                       
                        <Link to = "" className = "btn btn-secondary"
                            style = {{marginLeft:"10px"}}> 
                            C/U
                        </Link>    
                        </td>

                    //Desallowing Admin to modify Super_users details
                    :loggedinUserRoles === "3" && user.Role.role === "Super_User"  ?
                        <td>
                        <></>
                        </td>
                    
                    //Allowing Superuser to update all Superusers
                    : loggedinUserRoles === "4" && user.Role.role === "Super_User"?            
                        <td>
                        <Link to = {`/edit-user/${user.id}`} className='btn btn-info'>Update</Link>         
                        </td>

                    //Allowing Superuser to update & delete all users   
                    : loggedinUserRoles === "4" ?            
                        <td>
                        <Link to = {`/edit-user/${user.id}`} className='btn btn-info'>Update</Link> 
                        <Link to = "" className = "btn q" onClick = {() => deleteUser(user.id)}
                            style = {{marginLeft:"10px"}}> 
                            X 
                        </Link>    
                        </td> 
                        
                    
                    : (loggedinUserRoles === "3" || loggedinUserRoles === "4") && user.Role.role !== "Super_User" ?

                        <td>
                        <Link to = {`/edit-user/${user.id}`} className='btn btn-info'>Update</Link> 
                        <Link to = "" className = "btn btn-danger" onClick = {() => deleteUser(user.id)}
                               style = {{marginLeft:"10px"}}> 
                               X 
                        </Link>
                               
                        </td>  
                        : <td>
                            <></>
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