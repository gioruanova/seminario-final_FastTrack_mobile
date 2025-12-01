import { Platform, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { ANDROID_CHANNEL_CONFIG } from './config';

export function isPhysicalDevice(): boolean {
  return Device.isDevice;
}

export async function configureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') {
    return;
  }

  try {
    await Notifications.setNotificationChannelAsync('default', ANDROID_CHANNEL_CONFIG);
  } catch (error) {
    console.error('Error configurando canal de Android:', error);
  }
}

export async function getNotificationPermissions(): Promise<Notifications.PermissionStatus> {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  } catch (error) {
    console.error('Error obteniendo permisos:', error);
    return 'undetermined' as Notifications.PermissionStatus;
  }
}

export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    if (!isPhysicalDevice()) {
      Alert.alert(
        'Dispositivo no soportado',
        'Las notificaciones push solo funcionan en dispositivos físicos, no en emuladores o simuladores.'
      );
      return false;
    }

    await configureAndroidChannel();

    const existingStatus = await getNotificationPermissions();

    if (existingStatus === 'granted') {
      return true;
    }

    if (existingStatus === 'denied') {
      Alert.alert(
        'Permisos denegados',
        'Las notificaciones están deshabilitadas. Por favor, habilítalas en la configuración del dispositivo.'
      );
      return false;
    }

    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permisos requeridos',
        'Se necesitan permisos de notificaciones para recibir actualizaciones importantes.'
      );
      return false;
    }

    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error solicitando permisos:', error);
    Alert.alert('Error', `Error solicitando permisos: ${errorMessage}`);
    return false;
  }
}

