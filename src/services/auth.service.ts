import { apiClient } from './api';

export interface UserProfile {
  user_id: number;
  user_email: string;
  user_name: string;
  user_role: string;
  company_id: number;
  company_name: string;
  company_status: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    return apiClient.post('/publicApi/login', credentials);
  },

  async getProfile() {
    return apiClient.get<UserProfile>('/publicApi/profile');
  },

  async refresh() {
    return apiClient.get('/publicApi/refresh');
  },

  async logout() {
    return apiClient.get('/publicApi/logout');
  },
};

