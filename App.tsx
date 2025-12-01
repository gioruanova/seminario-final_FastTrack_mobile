import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text } from 'react-native';

import { COLORS } from './src/constants/theme';
import AppProviders from './src/contexts/AppProviders';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { useNotifications } from './src/hooks/useNotifications';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import LoginScreen from './src/screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user, isLoading } = useAuth();
  useNotifications();

  if (isLoading) {
    const backgroundImage = require('./assets/images/bg-mobile.jpg');
    return (
      <ImageBackground source={backgroundImage} style={styles.loadingContainer} resizeMode="cover">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Portal Fast Track</Text>
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
  loadingText: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
});

