import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getStoredPushToken,
  registerPushToken,
  removeStoredPushToken,
  isValidExpoToken,
} from '../notifications/tokenManager';
import { notificationsService } from '../services/notifications.service';

interface UseNotificationTokenReturn {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  registerToken: () => Promise<boolean>;
  unregisterToken: () => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
}

export function useNotificationToken(): UseNotificationTokenReturn {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isRegistering = useRef(false);

  const loadStoredToken = useCallback(async () => {
    try {
      const storedToken = await getStoredPushToken();
      if (storedToken && isValidExpoToken(storedToken)) {
        setToken(storedToken);
      }
    } catch (err) {
      console.error('Error cargando token guardado:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoredToken();
  }, [loadStoredToken]);

  const registerToken = useCallback(async (): Promise<boolean> => {
    if (isRegistering.current) {
      return false;
    }

    isRegistering.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const newToken = await registerPushToken();

      if (!newToken) {
        setError('No se pudo obtener el token de notificaciones');
        setIsLoading(false);
        isRegistering.current = false;
        return false;
      }

      const result = await notificationsService.registerToken(newToken);

      if (!result.success) {
        setError(result.error || 'Error registrando token en el servidor');
        setIsLoading(false);
        isRegistering.current = false;
        return false;
      }

      setToken(newToken);
      setIsLoading(false);
      isRegistering.current = false;
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setIsLoading(false);
      isRegistering.current = false;
      return false;
    }
  }, []);

  const unregisterToken = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const currentToken = token || (await getStoredPushToken());

      if (currentToken) {
        const result = await notificationsService.unregisterToken(currentToken);
        if (!result.success) {
          console.error('Error eliminando token del servidor:', result.error);
        }
      } else {
        await notificationsService.unregisterToken();
      }

      await removeStoredPushToken();
      setToken(null);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  }, [token]);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    await unregisterToken();
    return await registerToken();
  }, [registerToken, unregisterToken]);

  return {
    token,
    isLoading,
    error,
    registerToken,
    unregisterToken,
    refreshToken,
  };
}

