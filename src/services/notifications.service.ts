import { Platform } from 'react-native';
import { apiClient } from './api';

export interface RegisterNotificationTokenRequest {
  expoPushToken: string;
  platform: 'android' | 'ios';
}

export const notificationsService = {
  async registerToken(expoPushToken: string): Promise<boolean> {
    try {
      const platform = Platform.OS === 'ios' ? 'ios' : 'android';
      
      const response = await apiClient.post<{ success?: boolean }>(
        '/customersApi/notifications',
        {
          expoPushToken,
          platform,
        }
      );

      return response.success || false;
    } catch (error) {
      console.error('Error registrando token de notificaciones:', error);
      return false;
    }
  },

  async unregisterToken(expoPushToken: string): Promise<boolean> {
    try {
      const response = await apiClient.delete<{ success?: boolean }>(
        '/customersApi/notifications',
        {
          expoPushToken,
        }
      );

      return response.success || false;
    } catch (error) {
      console.error('Error eliminando token de notificaciones:', error);
      return false;
    }
  },
};

