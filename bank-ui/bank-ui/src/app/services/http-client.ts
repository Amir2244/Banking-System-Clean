import axios from 'axios';
import Cookies from 'js-cookie';

export const httpClient = axios.create({
    baseURL: 'https://localhost:7145', 
    headers: {
        'Content-Type': 'application/json',
    }
});


httpClient.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 404) {
            console.error('API endpoint not found:', error.config.url);
        }
        return Promise.reject(error);
    }
);
