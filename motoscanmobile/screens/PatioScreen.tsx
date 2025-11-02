import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { getMotosFromAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { Moto } from '../types';
import type { ColorPalette } from '../constants/Colors';
import { useLocalization } from '../context/LocalizationContext'; 

const PatioScreen: React.FC = () => {
  const { colors } = useTheme();
  const { i18n } = useLocalization(); 
  const styles = getStyles(colors);
  
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    const fetchMotos = async () => {
      try {
        setLoading(true);
        const dataFromApi = await getMotosFromAPI();
        setMotos(dataFromApi);
      } catch (error) {
        Alert.alert(i18n.t('patio.errorTitle'), i18n.t('patio.errorMessage'));
      } finally {
        setLoading(false);
      }
    };
    
    if (isFocused) {
      fetchMotos();
    }
  }, [isFocused]);

  const motosPorStatus = useMemo(() => {
    const prontas = motos.filter(m => !m.falhaMecanica && !m.roubada);
    const emManutencao = motos.filter(m => m.falhaMecanica);
    const comBO = motos.filter(m => m.roubada);
    return { prontas, emManutencao, comBO };
  }, [motos]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loader]}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={styles.loadingText}>{i18n.t('patio.loading')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.header}>{i18n.t('patio.title')}</Text>
      
      <View style={[styles.zone, styles.zoneDisponivel]}>
        <Text style={styles.zoneTitle}>
          {i18n.t('patio.zoneAvailable')} ({motosPorStatus.prontas.length})
        </Text>
        <View style={styles.motoContainer}>
          {motosPorStatus.prontas.map(moto => (
            <View key={moto.placa} style={[styles.motoDot, styles.dotDisponivel]} />
          ))}
        </View>
      </View>

      <View style={[styles.zone, styles.zoneManutencao]}>
        <Text style={styles.zoneTitle}>
          {i18n.t('patio.zoneMaintenance')} ({motosPorStatus.emManutencao.length})
        </Text>
        <View style={styles.motoContainer}>
          {motosPorStatus.emManutencao.map(moto => (
            <View key={moto.placa} style={[styles.motoDot, styles.dotManutencao]} />
          ))}
        </View>
      </View>

      <View style={[styles.zone, styles.zoneBO]}>
        <Text style={styles.zoneTitle}>
          {i18n.t('patio.zoneStolen')} ({motosPorStatus.comBO.length})
        </Text>
        <View style={styles.motoContainer}>
          {motosPorStatus.comBO.map(moto => (
            <View key={moto.placa} style={[styles.motoDot, styles.dotBO]} />
          ))}
        </View>
      </View>

    </ScrollView>
  );
};

const getStyles = (colors: ColorPalette) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text,
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  zone: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 15,
  },
  zoneDisponivel: {
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
    borderColor: 'rgba(40, 167, 69, 0.4)',
    borderWidth: 1,
  },
  zoneManutencao: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderColor: 'rgba(255, 193, 7, 0.4)',
    borderWidth: 1,
  },
  zoneBO: {
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
    borderColor: 'rgba(220, 53, 69, 0.4)',
    borderWidth: 1,
  },
  zoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  motoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  motoDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 4,
  },
  dotDisponivel: {
    backgroundColor: '#28a745',
  },
  dotManutencao: {
    backgroundColor: '#ffc107',
  },
  dotBO: {
    backgroundColor: '#dc3545',
  },
});

export default PatioScreen;