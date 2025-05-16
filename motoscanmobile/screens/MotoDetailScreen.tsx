// screens/MotoDetailScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/index';

const MotoDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MotoDetail'>>();
  const { moto } = route.params;

  const getDescricao = () => {
    if (moto.status.roubada || moto.status.multa) return 'Esta moto está com um boletim de ocorrência registrado.';
    if (moto.status.falhaMecanica) return 'Esta moto possui falhas mecânicas e precisa de manutenção.';
    return 'Esta moto está pronta para ser alugada.';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Moto</Text>
      <Image source={{ uri: moto.imagem }} style={styles.image} />
      <Text style={styles.label}>Modelo: {moto.modelo}</Text>
      <Text style={styles.label}>Placa: {moto.placa}</Text>
      <Text style={styles.description}>{getDescricao()}</Text>
    </View>
  );
};

export default MotoDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#00C247',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
});
