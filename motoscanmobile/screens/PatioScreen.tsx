import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { getMotosFromAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { Moto } from '../types';

const PatioScreen: React.FC = () => {
  const { colors } = useTheme();
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  
  // Busca os dados da API sempre que a tela entra em foco
  useEffect(() => {
    const fetchMotos = async () => {
      try {
        setLoading(true);
        const dataFromApi = await getMotosFromAPI();
        setMotos(dataFromApi);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do pátio.");
      } finally {
        setLoading(false);
      }
    };
    
    if (isFocused) {
      fetchMotos();
    }
  }, [isFocused]);

  // Filtra as motos por status. useMemo evita que o filtro seja refeito a cada renderização.
  const motosPorStatus = useMemo(() => {
    const prontas = motos.filter(m => !m.falhaMecanica && !m.roubada);
    const emManutencao = motos.filter(m => m.falhaMecanica);
    const comBO = motos.filter(m => m.roubada);
    return { prontas, emManutencao, comBO };
  }, [motos]);

  const styles = getStyles(colors);

  if (loading) {
    return (
      <View style={[styles.container, styles.loader]}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={styles.header}>Carregando Pátio...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Visão Geral do Pátio</Text>
      
      {/* Zona de Motos Disponíveis */}
      <View style={[styles.zone, styles.zoneDisponivel]}>
        <Text style={styles.zoneTitle}>Disponíveis ({motosPorStatus.prontas.length})</Text>
        <View style={styles.motoContainer}>
          {motosPorStatus.prontas.map(moto => (
            <View key={moto.placa} style={[styles.motoDot, styles.dotDisponivel]} />
          ))}
        </View>
      </View>

      {/* Zona de Motos em Manutenção */}
      <View style={[styles.zone, styles.zoneManutencao]}>
        <Text style={styles.zoneTitle}>Em Manutenção ({motosPorStatus.emManutencao.length})</Text>
        <View style={styles.motoContainer}>
          {motosPorStatus.emManutencao.map(moto => (
            <View key={moto.placa} style={[styles.motoDot, styles.dotManutencao]} />
          ))}
        </View>
      </View>

      {/* Zona de Motos com B.O. */}
      <View style={[styles.zone, styles.zoneBO]}>
        <Text style={styles.zoneTitle}>Com B.O. ({motosPorStatus.comBO.length})</Text>
        <View style={styles.motoContainer}>
          {motosPorStatus.comBO.map(moto => (
            <View key={moto.placa} style={[styles.motoDot, styles.dotBO]} />
          ))}
        </View>
      </View>

    </ScrollView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'rgba(0, 194, 71, 0.1)',
    borderColor: 'rgba(0, 194, 71, 0.4)',
    borderWidth: 1,
  },
  zoneManutencao: {
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    borderColor: 'rgba(255, 165, 0, 0.4)',
    borderWidth: 1,
  },
  zoneBO: {
    backgroundColor: 'rgba(255, 77, 77, 0.1)',
    borderColor: 'rgba(255, 77, 77, 0.4)',
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
    flexWrap: 'wrap', // Permite que as bolinhas quebrem a linha
  },
  motoDot: {
    width: 20,
    height: 20,
    borderRadius: 10, // Metade da largura/altura para ser um círculo
    margin: 4,
  },
  dotDisponivel: {
    backgroundColor: '#00C247',
  },
  dotManutencao: {
    backgroundColor: '#FFA500',
  },
  dotBO: {
    backgroundColor: '#FF4D4D',
  },
});

export default PatioScreen;