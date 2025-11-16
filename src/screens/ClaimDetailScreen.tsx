import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackToHomeButton from '../components/BackToHomeButton';
import PageTitle from '../components/PageTitle';
import { COLORS } from '../constants/theme';
import { Claim, getClaimDetail } from '../services/claims.service';
import { RootDrawerParamList } from '../types/navigation';

type ClaimDetailScreenRouteProp = RouteProp<RootDrawerParamList, 'ClaimDetail'>;

export default function ClaimDetailScreen() {
  const route = useRoute<ClaimDetailScreenRouteProp>();
  const { reclamoId } = route.params;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaimDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getClaimDetail(reclamoId);

        if (response.success && response.data) {
          setClaim(response.data);
        } else {
          setError(response.error || 'Error al cargar el reclamo');
        }
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setIsLoading(false);
      }
    };

    if (reclamoId) {
      fetchClaimDetail();
    } else {
      setError('No se recibió ID del reclamo');
      setIsLoading(false);
    }
  }, [reclamoId]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Cargando detalle del reclamo...</Text>
      </View>
    );
  }

  if (error || !claim) {
    return (
      <ScrollView style={styles.container}>
        <PageTitle>Detalle del Reclamo</PageTitle>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Reclamo no encontrado'}</Text>
        </View>
        <BackToHomeButton />
      </ScrollView>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString?.slice(0, 5) || '';
  };

  const handleOpenMap = async () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${claim?.cliente_lat},${claim?.cliente_lng}`;

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'No se puede abrir el mapa en este dispositivo');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir el mapa');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <PageTitle>{`Detalle del Reclamo #${claim.reclamo_id}`}</PageTitle>

      <View style={styles.card}>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusBadge,
              claim.reclamo_estado === 'ABIERTO' ? styles.statusOpen : styles.statusClosed,
            ]}
          >
            {claim.reclamo_estado}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Información General</Text>

        <View style={styles.sectionFlex}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Creado por:</Text>
            <Text style={styles.value}>{claim.creador}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Fecha de creación:</Text>
            <Text style={styles.value}>{formatDate(claim.created_at)}</Text>
          </View>
        </View>

        <View style={styles.sectionFlex}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>
              {claim.agenda_fecha ? formatDate(claim.agenda_fecha) : 'No programada'}
            </Text>
          </View>
          {claim.agenda_hora_desde && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Horario:</Text>
              <Text style={styles.value}>
                {formatTime(claim.agenda_hora_desde)}
                {claim.agenda_hora_hasta && ` - ${formatTime(claim.agenda_hora_hasta)}`}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Especialidad:</Text>
          <Text style={styles.value}>{claim.nombre_especialidad}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Información del Cliente</Text>
        <View style={styles.section}>
          <View style={styles.sectionFlex}>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.value}>{claim.cliente_complete_name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Cliente ID:</Text>
              <Text style={styles.value}>{claim.cliente_dni}</Text>
            </View>
          </View>
          <View style={styles.sectionFlex}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Teléfono:</Text>
              <Text style={styles.value}>{claim.cliente_phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{claim.cliente_email}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>{claim.cliente_direccion}</Text>
          </View>

          <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
            <Text style={styles.mapButtonText}>📍 Ver en el mapa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Descripción del Reclamo</Text>
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Título:</Text>
            <Text style={styles.value}>{claim.reclamo_titulo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Detalle:</Text>
            <Text style={styles.value}>{claim.reclamo_detalle}</Text>
          </View>
        </View>

        {claim.reclamo_estado === 'CERRADO' && (
          <>
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información de Cierre</Text>
              {claim.reclamo_nota_cierre && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Nota de cierre:</Text>
                  <Text style={styles.value}>{claim.reclamo_nota_cierre}</Text>
                </View>
              )}
              {claim.reclamo_presupuesto && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Presupuesto:</Text>
                  <Text style={styles.value}>{claim.reclamo_presupuesto}</Text>
                </View>
              )}
            </View>
          </>
        )}
      </View>

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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: COLORS.danger,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  statusContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  statusOpen: {
    backgroundColor: COLORS.success,
    color: COLORS.white,
  },
  statusClosed: {
    backgroundColor: '#999',
    color: COLORS.white,
  },
  sectionFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 12,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  infoRow: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 20,
  },
  mapButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  mapButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
});

