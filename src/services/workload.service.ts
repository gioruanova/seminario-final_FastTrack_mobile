import { apiClient } from './api';
import { ApiResponse } from './auth.service';

export interface WorkloadStatus {
  enabled: boolean;
}

interface WorkloadToggleResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export async function getWorkloadStatus(): Promise<ApiResponse<WorkloadStatus>> {
  return apiClient.get<WorkloadStatus>('/workload/estado');
}

export async function enableWorkload(): Promise<ApiResponse<WorkloadStatus>> {
  const response = await apiClient.put<WorkloadToggleResponse>('/workload/enable', {});
  
  if (response.success && response.data?.success) {
    return {
      success: true,
      data: { enabled: true },
      message: response.data.message,
      statusCode: response.statusCode,
    };
  }
  
  if (response.data?.error) {
    return {
      success: true,
      data: { enabled: true },
      message: response.data.error,
      statusCode: response.statusCode,
    };
  }
  
  return {
    success: false,
    error: response.error || 'Error al habilitar workload',
    statusCode: response.statusCode,
  } as ApiResponse<WorkloadStatus>;
}

export async function disableWorkload(): Promise<ApiResponse<WorkloadStatus>> {
  const response = await apiClient.put<WorkloadToggleResponse>('/workload/disable', {});
  
  if (response.success && response.data?.success) {
    return {
      success: true,
      data: { enabled: false },
      message: response.data.message,
      statusCode: response.statusCode,
    };
  }
  
  if (response.data?.error) {
    return {
      success: true,
      data: { enabled: false },
      message: response.data.error,
      statusCode: response.statusCode,
    };
  }
  
  return {
    success: false,
    error: response.error || 'Error al deshabilitar workload',
    statusCode: response.statusCode,
  } as ApiResponse<WorkloadStatus>;
}

