import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BackToHomeButton from '../components/BackToHomeButton';
import ClaimsList from '../components/ClaimsList';
import PageTitle from '../components/PageTitle';
import { COLORS } from '../constants/theme';
import { useClaims } from '../hooks/useClaims';
import { Claim } from '../services/claims.service';
import { RootDrawerParamList } from '../types/navigation';

type OpenClaimsScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'OpenClaims'>;

export default function OpenClaimsScreen() {
  const navigation = useNavigation<OpenClaimsScreenNavigationProp>();
  const { claims, isLoading, error } = useClaims({ filter: 'open' });

  const handleClaimPress = (claim: Claim) => {
    navigation.navigate('ClaimDetail', { reclamoId: claim.reclamo_id });
  };
  
  return (
    <ScrollView style={styles.container}>
      <PageTitle>Reclamos Abiertos</PageTitle>
      
      <ClaimsList
        claims={claims}
        isLoading={isLoading}
        error={error}
        emptyMessage="No hay reclamos abiertos"
        onClaimPress={handleClaimPress}
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

