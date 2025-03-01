import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_DEV || import.meta.env.VITE_API_URL_PROD;
//testing
console.log("API_URL:", API_URL);

const dynamicAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,  
    timeout: 5000,    
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});
export {
    API_URL
}

export default dynamicAxios;
