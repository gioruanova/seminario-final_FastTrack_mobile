import { Platform } from 'react-native';
import { apiClient } from './api';
import { isValidExpoToken } from '../notifications/tokenManager';

export interface RegisterTokenResult {
  success: boolean;
  error?: string;
}

export interface UnregisterTokenResult {
  success: boolean;
  error?: string;
}

export const notificationsService = {
  async registerToken(expoPushToken: string): Promise<RegisterTokenResult> {
    try {
      if (!expoPushToken || !isValidExpoToken(expoPushToken)) {
        return {
          success: false,
          error: 'Token de notificaciones inválido',
        };
      }

      const platform = Platform.OS === 'ios' ? 'ios' : 'android';

      const response = await apiClient.post<{ success?: boolean; message?: string }>(
        '/notifications',
        {
          expoPushToken,
          platform,
        }
      );

      if (!response.success) {
        return {
          success: false,
          error: response.message || 'Error al registrar token en el servidor',
        };
      }

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error registrando token:', errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  async unregisterToken(expoPushToken?: string): Promise<UnregisterTokenResult> {
    try {
      if (expoPushToken && !isValidExpoToken(expoPushToken)) {
        return {
          success: false,
          error: 'Token de notificaciones inválido',
        };
      }

      const body = expoPushToken ? { expoPushToken } : {};

      const response = await apiClient.delete<{ success?: boolean; message?: string }>(
        '/notifications',
        body
      );

      if (!response.success) {
        return {
          success: false,
          error: response.message || 'Error al eliminar token del servidor',
        };
      }

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error eliminando token:', errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  async validateToken(expoPushToken: string): Promise<boolean> {
    try {
      if (!isValidExpoToken(expoPushToken)) {
        return false;
      }

      const result = await this.registerToken(expoPushToken);
      return result.success;
    } catch (error) {
      console.error('Error validando token:', error);
      return false;
    }
  },
};

