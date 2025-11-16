import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

interface DrawerMenuItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export default function DrawerMenuItem({ icon, label, isActive, onPress }: DrawerMenuItemProps) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, isActive && styles.menuItemActive]}
      onPress={onPress}
    >
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemActive: {
    backgroundColor: '#F5F0FF',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  menuLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});

