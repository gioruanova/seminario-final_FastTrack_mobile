import * as Notifications from 'expo-notifications';

export function configureNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export const ANDROID_CHANNEL_CONFIG = {
  name: 'Notificaciones Fast Track',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250] as number[],
  lightColor: '#8e51ff',
  showBadge: true,
  enableVibrate: true,
  sound: 'default',
};

export const STORAGE_KEYS = {
  PUSH_TOKEN: '@fasttrack:push_token',
} as const;

