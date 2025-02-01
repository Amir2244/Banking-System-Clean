import { httpClient } from '../http-client';
import { LoginDto, RegisterDto, AuthResponse } from '@/types/auth';
import Cookies from 'js-cookie';

export const authService = {
    register: async (data: RegisterDto): Promise<AuthResponse> => {
        const response = await httpClient.post<AuthResponse>('/api/auth/register', data);
        Cookies.set('token', response.data.token);
        authService.saveUserSession(response.data);
        return response.data;
    },

    saveUserSession(userData: AuthResponse) {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
    },

    getUserSession(): AuthResponse | null {
        const userSession = sessionStorage.getItem('currentUser');
        return userSession ? JSON.parse(userSession) : null;
    },

    login: async (data: LoginDto): Promise<AuthResponse> => {
        const response = await httpClient.post<AuthResponse>('/api/auth/login', data);
        Cookies.set('token', response.data.token);
        authService.saveUserSession(response.data);
        return response.data;
    },
};
