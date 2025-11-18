import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import BackToHomeButton from '../../components/buttons/BackToHomeButton';
import PageTitle from '../../components/header/PageTitle';
import QuickContacts from '../../components/ui/QuickContacts';
import { COLORS } from '../../constants/theme';

export default function QuickContactsScreen() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <PageTitle>Contactos Rápidos</PageTitle>
        <QuickContacts />
        <BackToHomeButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
});

