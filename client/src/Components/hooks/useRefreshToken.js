import axios from "axios"
import UseAuth from "../context/UseAuth"

const useRefreshToken = () => {
    const { setAuth } = UseAuth();

    const refresh = async () => {
        const response = await axios.get("http://localhost:4000/refresh", {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken