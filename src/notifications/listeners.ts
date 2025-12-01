import * as Notifications from 'expo-notifications';

export type NotificationReceivedCallback = (notification: Notifications.Notification) => void;

export type NotificationResponseCallback = (response: Notifications.NotificationResponse) => void;

export function setupNotificationListeners(
  onNotificationReceived?: NotificationReceivedCallback,
  onNotificationResponse?: NotificationResponseCallback
): () => void {
  const notificationSubscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log('Notificación recibida:', notification);
      onNotificationReceived?.(notification);
    }
  );

  const responseSubscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      console.log('Usuario interactuó con notificación:', response);
      onNotificationResponse?.(response);
    }
  );

  return () => {
    notificationSubscription.remove();
    responseSubscription.remove();
  };
}

export async function getLastNotification(): Promise<Notifications.NotificationResponse | null> {
  try {
    return await Notifications.getLastNotificationResponseAsync();
  } catch (error) {
    console.error('Error obteniendo última notificación:', error);
    return null;
  }
}

