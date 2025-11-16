import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function BackToHomeButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.dispatch(DrawerActions.closeDrawer());

    setTimeout(() => {
      navigation.navigate('Dashboard' as never);
    }, 100);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.icon}>🏠</Text>
          <Text style={styles.text}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 16, borderTopWidth: 1,
    borderTopColor: COLORS.black,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    gap: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

