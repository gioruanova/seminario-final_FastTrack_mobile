import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';

import { COLORS } from './src/constants/theme';
import AppProviders from './src/contexts/AppProviders';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { registerForPushNotificationsAsync } from './src/notifications/pushNotifications';
import LoginScreen from './src/screens/auth/LoginScreen';
import { notificationsService } from './src/services/notifications.service';

const PUSH_TOKEN_KEY = '@push_token';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user, isLoading } = useAuth();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    if (user) {
      const getToken = async () => {
        try {
          const token = await registerForPushNotificationsAsync();
          if (token) {
            await AsyncStorage.setItem(PUSH_TOKEN_KEY, token);
            await notificationsService.registerToken(token);
          }
        } catch (error) {
          console.error('Error registrando notificaciones:', error);
        }
      };

      getToken();

      notificationListener.current = Notifications.addNotificationReceivedListener(() => {
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {
      });

      return () => {
        if (notificationListener.current) {
          notificationListener.current.remove();
        }
        if (responseListener.current) {
          responseListener.current.remove();
        }
      };
    }
  }, [user]);

  if (isLoading) {
    const backgroundImage = require('./assets/images/bg-mobile.jpg');
    return (
      <ImageBackground source={backgroundImage} style={styles.loadingContainer} resizeMode="cover">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </ImageBackground>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main">
            {() => (
              <AppProviders>
                <DrawerNavigator />
              </AppProviders>
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Navigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

