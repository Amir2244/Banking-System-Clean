import { httpClient } from '../http-client';
import { LoginDto, RegisterDto, AuthResponse } from '@/types/auth';
import Cookies from 'js-cookie';

export const authService = {
    register: async (data: RegisterDto): Promise<AuthResponse> => {
        const response = await httpClient.post<AuthResponse>('/api/auth/register', data);
        const sessionId = crypto.randomUUID();
        Cookies.set('sessionId', sessionId);
        Cookies.set(`token-${sessionId}`, response.data.token);
        sessionStorage.setItem('sessionId', sessionId);
        authService.saveUserSession(response.data);
        return response.data;
    },

    login: async (data: LoginDto): Promise<AuthResponse> => {
        const response = await httpClient.post<AuthResponse>('/api/auth/login', data);
        const sessionId = crypto.randomUUID();
        Cookies.set('sessionId', sessionId);
        Cookies.set(`token-${sessionId}`, response.data.token);
        sessionStorage.setItem('sessionId', sessionId);
        authService.saveUserSession(response.data);
        return response.data;
    },

    saveUserSession(userData: AuthResponse) {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
    }
};
