import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BackToHomeButton from '../components/BackToHomeButton';
import PageTitle from '../components/PageTitle';
import { COLORS } from '../constants/theme';

export default function FeedbackScreen() {
  return (
    <ScrollView style={styles.container}>
      <PageTitle>Feedback</PageTitle>
      <BackToHomeButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.white,
  },
});

