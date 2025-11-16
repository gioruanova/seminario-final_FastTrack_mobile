import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface DrawerHeaderProps {
  userName?: string;
  userEmail?: string;
  onClose: () => void;
}

export default function DrawerHeader({ userName, userEmail, onClose }: DrawerHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>FastTrack</Text>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.userEmail}>{userEmail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: COLORS.primary,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#E0D0FF',
  },
});

