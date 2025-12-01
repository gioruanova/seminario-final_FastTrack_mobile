import { useState, useEffect, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import {
  setupNotificationListeners,
  NotificationReceivedCallback,
  NotificationResponseCallback,
  getLastNotification,
} from '../notifications/listeners';
import { configureNotificationHandler } from '../notifications/config';
import { useNotificationToken } from './useNotificationToken';

interface UseNotificationsReturn {
  token: string | null;
  notification: Notifications.Notification | null;
  isLoading: boolean;
  error: string | null;
  registerToken: () => Promise<boolean>;
  unregisterToken: () => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
  setNotificationHandler: (callback: NotificationReceivedCallback) => void;
  setResponseHandler: (callback: NotificationResponseCallback) => void;
}

export function useNotifications(): UseNotificationsReturn {
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [notificationHandler, setNotificationHandlerState] =
    useState<NotificationReceivedCallback | null>(null);
  const [responseHandler, setResponseHandlerState] =
    useState<NotificationResponseCallback | null>(null);

  const {
    token,
    isLoading: tokenLoading,
    error: tokenError,
    registerToken,
    unregisterToken,
    refreshToken,
  } = useNotificationToken();

  useEffect(() => {
    configureNotificationHandler();

    const cleanup = setupNotificationListeners(
      (notif) => {
        setNotification(notif);
        notificationHandler?.(notif);
      },
      (response) => {
        setNotification(response.notification);
        responseHandler?.(response);
      }
    );

    getLastNotification().then((lastResponse) => {
      if (lastResponse) {
        setNotification(lastResponse.notification);
      }
    });

    return cleanup;
  }, [notificationHandler, responseHandler]);

  const setNotificationHandler = useCallback((callback: NotificationReceivedCallback) => {
    setNotificationHandlerState(() => callback);
  }, []);

  const setResponseHandler = useCallback((callback: NotificationResponseCallback) => {
    setResponseHandlerState(() => callback);
  }, []);

  return {
    token,
    notification,
    isLoading: tokenLoading,
    error: tokenError,
    registerToken,
    unregisterToken,
    refreshToken,
    setNotificationHandler,
    setResponseHandler,
  };
}

