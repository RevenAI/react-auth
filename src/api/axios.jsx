import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_DEV || import.meta.env.VITE_API_URL_PROD;

const apiRequest = axios.create({
    baseURL: API_URL
});

export {
    API_URL
}

export default apiRequest;
