// screens/MotoDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../types';

type MotoDetailRouteProp = RouteProp<RootStackParamList, 'MotoDetail'>;

const MotoDetailScreen: React.FC = () => {
  const route = useRoute<MotoDetailRouteProp>();
  const { moto } = route.params;

  const getStatusText = () => {
    if (moto.status.roubada) return 'BO (Roubada)';
    if (moto.status.falhaMecanica) return 'Problema Mecânico';
    return 'Pronta para alugar';
  };

  const getStatusColor = () => {
    if (moto.status.roubada) return '#FF4D4D';
    if (moto.status.falhaMecanica) return '#FFA500';
    return '#00C247';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Moto</Text>
      <Image source={moto.imagem} style={styles.image} />

      <Text style={styles.label}>Modelo:</Text>
      <Text style={styles.value}>{moto.modelo}</Text>

      <Text style={styles.label}>Placa:</Text>
      <Text style={styles.value}>{moto.placa}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={[styles.value, { color: getStatusColor() }]}>{getStatusText()}</Text>
    </View>
  );
};

export default MotoDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C247',
    marginBottom: 20,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10
  },
  value: {
    fontSize: 18,
    marginBottom: 8
  }
});
