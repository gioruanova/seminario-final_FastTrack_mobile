import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { STORAGE_KEYS } from './config';
import { requestNotificationPermissions } from './permissions';

export function getEASProjectId(): string | null {
  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ||
    Constants.easConfig?.projectId ||
    Constants.expoConfig?.extra?.projectId;

  if (!projectId) {
    console.error('No se encontró projectId de EAS. Verifica la configuración en app.json');
    return null;
  }

  return projectId;
}

export async function getExpoPushToken(): Promise<string | null> {
  try {
    const hasPermissions = await requestNotificationPermissions();
    if (!hasPermissions) {
      return null;
    }

    const projectId = getEASProjectId();
    if (!projectId) {
      Alert.alert(
        'Error de Configuración',
        'No se encontró projectId de EAS. Verifica la configuración en app.json'
      );
      return null;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    if (!tokenData?.data) {
      console.error('No se pudo obtener el token de Expo Push Notifications');
      return null;
    }

    return tokenData.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error obteniendo token de Expo:', errorMessage);
    return null;
  }
}

export async function savePushToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PUSH_TOKEN, token);
  } catch (error) {
    console.error('Error guardando token:', error);
    throw error;
  }
}

export async function getStoredPushToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.PUSH_TOKEN);
  } catch (error) {
    console.error('Error obteniendo token guardado:', error);
    return null;
  }
}

export async function removeStoredPushToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.PUSH_TOKEN);
  } catch (error) {
    console.error('Error eliminando token guardado:', error);
  }
}

export function isValidExpoToken(token: string): boolean {
  return /^ExponentPushToken\[.+\]$/.test(token);
}

export async function registerPushToken(): Promise<string | null> {
  try {
    const token = await getExpoPushToken();
    if (token && isValidExpoToken(token)) {
      await savePushToken(token);
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error registrando token:', error);
    return null;
  }
}

