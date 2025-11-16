import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';

interface MenuButtonProps {
  navigation: DrawerNavigationProp<any>;
}

export default function MenuButton({ navigation }: MenuButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={styles.container}
    >
      <View style={styles.burgerButton}>
        <View style={styles.burgerLine} />
        <View style={styles.burgerLine} />
        <View style={styles.burgerLine} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
  },
  burgerButton: {
    width: 30,
    height: 24,
    justifyContent: 'space-between',
  },
  burgerLine: {
    width: '100%',
    height: 3,
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },
});

