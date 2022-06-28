import axios from "axios"
import UseAuth from "../context/UseAuth"

const useRefreshToken = () => {
    const { setAuth } = UseAuth();

    const refresh = async () => {
        const response = await axios.get("http://localhost:4000/refresh",  {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        setAuth(prevState => {
            console.log(JSON.stringify(prevState));
            console.log(response.data.accessToken);
            return { 
                ...prevState,
                roles: response.data.roles, 
                firstName: response.data.firstName,
                accessToken: response.data.accessToken 
            }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken