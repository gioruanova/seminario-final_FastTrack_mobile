import * as WebBrowser from 'expo-web-browser';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import config from '../constants/config';
import { useAuthNotifications } from '../hooks/useAuthNotifications';
import { useNotificationToken } from '../hooks/useNotificationToken';
import { authService, UserProfile } from '../services/auth.service';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
    statusCode?: number;
  }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { unregisterToken } = useNotificationToken();
  const { registerPushNotifications } = useAuthNotifications();

  const checkSession = useCallback(async () => {
    try {
      const response = await authService.getProfile();
      if (response.success && response.data) {
        const userProfile = response.data;
        setUser(userProfile);
        if (userProfile.user_role === 'profesional') {
          registerPushNotifications(userProfile).catch((error) => {
            console.error('Error registrando notificaciones en checkSession:', error);
          });
        }
      } else if (response.statusCode === 401) {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [registerPushNotifications]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await authService.login({ email, password });

        if (!response.success) {
          return {
            success: false,
            error: response.error || 'Error al iniciar sesión',
            statusCode: response.statusCode,
          };
        }

        const profileResponse = await authService.getProfile();

        if (!profileResponse.success || !profileResponse.data) {
          return {
            success: false,
            error: 'Error al obtener el perfil del usuario',
          };
        }

        const userProfile = profileResponse.data;

        if (userProfile.user_role !== 'profesional') {
          await WebBrowser.openBrowserAsync(config.defaultWebApp);
          return {
            success: true,
          };
        }

        setUser(userProfile);

        registerPushNotifications(userProfile).catch((error) => {
          console.error('Error registrando notificaciones después del login:', error);
        });

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido',
        };
      }
    },
    [registerPushNotifications]
  );

  const logout = useCallback(async () => {
    try {
      await unregisterToken();
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
    }
  }, [unregisterToken]);

  const refreshProfile = useCallback(async () => {
    try {
      const response = await authService.getProfile();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error refrescando perfil:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
