import axios from 'axios';
import Cookies from 'js-cookie';

const httpClient = axios.create({
    baseURL: 'https://localhost:7145',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

httpClient.interceptors.request.use(config => {
    const sessionId = sessionStorage.getItem('sessionId');
    const token = sessionId ? Cookies.get(`token-${sessionId}`) : null;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 400) {
            throw error.response.data;
        }
        throw error;
    });

export { httpClient };
