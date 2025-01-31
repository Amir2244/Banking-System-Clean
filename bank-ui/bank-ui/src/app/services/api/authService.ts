import { httpClient } from '../http-client';
import { LoginDto, RegisterDto, AuthResponse } from '@/app/types/auth';
import Cookies from 'js-cookie';

export const authService = {
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>('/api/auth/register', data);
    Cookies.set('token', response.data.token);
    return response.data;
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>('/api/auth/login', data);
    Cookies.set('token', response.data.token);
    return response.data;
  },
};
