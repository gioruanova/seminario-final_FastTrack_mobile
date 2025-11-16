import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BackToHomeButton from '../components/BackToHomeButton';
import ClaimsList from '../components/ClaimsList';
import PageTitle from '../components/PageTitle';
import { COLORS } from '../constants/theme';
import { useClaims } from '../hooks/useClaims';

export default function ClosedClaimsScreen() {
  const { claims, isLoading, error } = useClaims({ filter: 'closed' });

  return (
    <ScrollView style={styles.container}>
      <PageTitle>Reclamos Cerrados</PageTitle>
      
      <ClaimsList
        claims={claims}
        isLoading={isLoading}
        error={error}
        emptyMessage="No hay reclamos cerrados"
      />
      
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

