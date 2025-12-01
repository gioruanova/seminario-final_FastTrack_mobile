import { useCallback } from 'react';
import { UserProfile } from '../services/auth.service';
import { useNotificationToken } from './useNotificationToken';
import { getStoredPushToken } from '../notifications/tokenManager';
import { notificationsService } from '../services/notifications.service';

export function useAuthNotifications() {
  const { registerToken } = useNotificationToken();

  const registerPushNotifications = useCallback(
    async (userProfile: UserProfile): Promise<void> => {
      if (userProfile.user_role !== 'profesional') {
        return;
      }

      try {
        const existingToken = await getStoredPushToken();

        if (existingToken) {
          const result = await notificationsService.registerToken(existingToken);
          if (!result.success) {
            await registerToken();
          }
          return;
        }

        await registerToken();
      } catch (error) {
        console.error('Error registrando notificaciones:', error);
      }
    },
    [registerToken]
  );

  return { registerPushNotifications };
}

