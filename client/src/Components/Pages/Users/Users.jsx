import React,{useState, useEffect} from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom';
// import './Users.css';
import { toast  } from 'react-toastify';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import UseAuth from "../../context/UseAuth";
import jwt_decode from "jwt-decode";
import * as AiIcons from "react-icons/ai";


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
        <h2 className='text-center mb-3 mt-5'>Users</h2> 
    

    {/* Search */}
    <div className='form-group row mt-2'>
    <div className='search_bar col-sm-3'>
            <input 
            className="form-control mb-2"
                type="text" 
                value={searchUser}
                placeholder="Start typing here to search..."
                onChange={(e)=> setSearchUser(e.target.value)}
            />     
        </div>

        <div className='col-md-3 offset-6'>

        <Link to = '/add-user' className='btn btn-outline-success  col-sm-12'   >Add New user</Link>

    </div>
    </div>
    
    <div className='responsive-table'>
    <table className="table table-striped table-hover table-sm">
    <thead>
     <tr>
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
                <tr key = {user.id}
                    onDoubleClick={()=>{
                        navigate(`/edit-user/${user.id}`)
                    }}>

                    <td> {user.firstName} </td>
                    <td> {user.lastName} </td>
                    <td> {user.Role.role} </td>
                    <td> {user.email} </td>         
                    
                    {
                    //Denying loggedin user right to delete himself/herself 
                    loggedinUserEmail === user.email ?
                        <td>
                        <Link to = {`/edit-user/${user.id}`} className='btn btn-info'><AiIcons.AiFillEdit/></Link>
                       
                        <Link to = "" className = "btn btn-secondary"
                            style = {{marginLeft:"10px"}}> 
                             <AiIcons.AiFillDelete/> 
                        </Link>    
                        </td>

                    //Disallowing Admin to modify Super_users details
                    :loggedinUserRoles === "3" && user.Role.role === "Super_User"  ?
                        <td>
                        <></>
                        </td>
                    
                    //Allowing Superuser to update all Superusers&users
                    : loggedinUserRoles === "4" && user.Role.role === "Super_User"?            
                        <td>
                        <Link to = {`/edit-user/${user.id}`} className='btn btn-info'><AiIcons.AiFillEdit/></Link>         
                        </td>

                    //Allowing Superuser to update & delete all users   
                    : loggedinUserRoles === "4" ?            
                        <td>
                        <Link to = {`/edit-user/${user.id}`} className='btn btn-info'><AiIcons.AiFillEdit/></Link> 
                        <Link to = "" className = "btn btn-danger" onClick = {() => deleteUser(user.id)}
                            style = {{marginLeft:"10px"}}> 
                            <AiIcons.AiFillDelete/>  
                        </Link>    
                        </td> 
                        
                    
                    : (loggedinUserRoles === "3" || loggedinUserRoles === "4") && user.Role.role !== "Super_User" ?

                        <td>
                        <Link to = {`/edit-user/${user.id}`} className='btn btn-info'><AiIcons.AiFillEdit/></Link> 
                        <Link to = "" className = "btn btn-danger" onClick = {() => deleteUser(user.id)}
                               style = {{marginLeft:"10px"}}> 
                               <AiIcons.AiFillDelete/> 
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



