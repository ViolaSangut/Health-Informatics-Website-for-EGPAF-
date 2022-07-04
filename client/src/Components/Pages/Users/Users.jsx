import React,{useState, useEffect, useContext} from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom';
import './Users.css';
import { toast  } from 'react-toastify';
import usePrivateAxios from '../../hooks/usePrivateAxios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const privateAxios = usePrivateAxios();

    const [error, setError] = useState('');
   

    useEffect(() => {
     
        // const controller = new AbortController();   
        
        //List 
        const getAllUsers = () =>{
            privateAxios.get('/users')
            .then((response)=>{
            //console.log(response.data)
            setUsers(response.data);
            // setError("");
            })
            .catch((error)=>{
                console.log(error);
                // setError(error.message);
                console.log(error.message)
                // if(error.message === "Request failed with status code 401"){
                //     navigate('/unauthorized', { state: { from: location }, replace: true });
                // } else if (error.response.status === 401){
                    navigate('/unauthorized');
                // }
                // else{
                // navigate('/', { state: { from: location }, replace: true });
                // }
            })
        }
        getAllUsers();

        // return () =>{
        //     controller.abort();
        // }
      
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
        <th> Actions</th>         
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