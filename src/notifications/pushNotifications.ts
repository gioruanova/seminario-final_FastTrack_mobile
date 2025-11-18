import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  try {
    let token: string | undefined;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        showBadge: true,
        enableVibrate: true,
        sound: 'default',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('No se pudo obtener permiso para notificaciones!');
      return;
    }

    const projectId = 
      Constants.expoConfig?.extra?.eas?.projectId ||
      Constants.easConfig?.projectId ||
      Constants.expoConfig?.extra?.projectId;
    
    if (projectId) {
      try {
        const expoToken = await Notifications.getExpoPushTokenAsync({
          projectId,
        });
        token = expoToken.data;
      } catch (error: any) {
        throw error;
      }
    } else {
      try {
        const expoToken = await Notifications.getExpoPushTokenAsync();
        token = expoToken.data;
      } catch (error: any) {
        throw new Error(`No se puede obtener el token sin projectId. ${error.message}`);
      }
    }
    
    return token;
  } catch (error) {
    console.error('Error obteniendo token de notificaciones:', error);
    return undefined;
  }
}
