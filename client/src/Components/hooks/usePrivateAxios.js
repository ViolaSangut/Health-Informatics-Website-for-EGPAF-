import { privateAxios } from "../api/axios";
import { useEffect } from "react";
import UseAuth from "../context/UseAuth";
import useRefreshToken from "./useRefreshToken";

const usePrivateAxios = () => {
    const refresh = useRefreshToken();
    const { auth } = UseAuth();

    useEffect(() => {

        //Request Interceptor
        const requestIntercept = privateAxios.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) { //Confirming req isn't retry.
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        //Response Interceptor
        const responseIntercept = privateAxios.interceptors.response.use(
            response => response, //Return res if accessToken hasn't expired
            async (error) => {
                const previousRequest = error?.config; //Getting prev req
                if (error?.response?.status === 403 && !previousRequest?.sent) { //retry once if !previousRequest?.sent 
                    previousRequest.sent = true;
                    //Getting  new accessToken, parsing it to Authorization setting in prev req's headers
                    const newAccessToken = await refresh();
                    previousRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return privateAxios(previousRequest); //parsing updated prev req & making req again.
                }
                return Promise.reject(error);
            }
        );

        return () => {
            //removing interceptors when cleanup func runs
            privateAxios.interceptors.request.eject(requestIntercept); 
            privateAxios.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return privateAxios;
}

export default usePrivateAxios