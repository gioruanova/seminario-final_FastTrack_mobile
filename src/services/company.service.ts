import { apiClient } from './api';

export interface CompanyInfo {
  company_id: number;
  company_unique_id: string;
  company_nombre: string;
  company_phone: string;
  company_email: string;
  company_whatsapp: string;
  company_telegram: string;
  company_estado: number;
  limite_operadores: number;
  limite_profesionales: number;
  limite_especialidades: number;
  reminder_manual: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export async function getCompanyInfo(): Promise<ApiResponse<CompanyInfo>> {
  return apiClient.get<CompanyInfo>('/customersApi/company/companyInfo');
}

