import dynamicAxios from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useDynamicAxios = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = dynamicAxios.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = dynamicAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return dynamicAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            dynamicAxios.interceptors.request.eject(requestIntercept);
            dynamicAxios.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return dynamicAxios;
}

export default useDynamicAxios;