// screens/MotoListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Moto } from '../types/index';

type Status = 'BO' | 'MECANICO' | 'PRONTA';

const mockMotos: Moto[] = [
  { modelo: 'POP', placa: 'ABC1234', imagem: '../assets/pop.webp', status: { multa: false, falhaMecanica: true, roubada: false } },
  { modelo: 'MOTO SPORT', placa: 'XYZ5678', imagem: '../assets/sport-2.webp', status: { multa: true, falhaMecanica: false, roubada: false } },
  { modelo: 'MOTO ELÉTRICA', placa: 'EFG9101', imagem: '../assets/e-1.webp', status: { multa: false, falhaMecanica: false, roubada: false } },
];

const MotoListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    // Simulando busca local
    setMotos(mockMotos);
  }, []);

  const getStatusCor = (moto: Moto) => {
    if (moto.status.roubada || moto.status.multa) return '#FF3B30'; // vermelho
    if (moto.status.falhaMecanica) return '#FFA500'; // laranja
    return '#00C247'; // verde
  };

  const getStatusTexto = (moto: Moto): string => {
    if (moto.status.roubada || moto.status.multa) return 'BO';
    if (moto.status.falhaMecanica) return 'Problema Mecânico';
    return 'Pronta';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Motos</Text>
      <FlatList
        data={motos}
        keyExtractor={(item) => item.placa}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { borderLeftColor: getStatusCor(item) }]}
            onPress={() => navigation.navigate('MotoDetail', { moto: item })}
          >
            <View style={styles.cardContent}>
              <Text style={styles.model}>{item.modelo}</Text>
              <Text style={styles.placa}>Placa: {item.placa}</Text>
              <Text style={[styles.status, { color: getStatusCor(item) }]}>{getStatusTexto(item)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MotoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#00C247',
  },
  card: {
    borderLeftWidth: 8,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'column',
  },
  model: {
    fontSize: 18,
    fontWeight: '600',
  },
  placa: {
    fontSize: 16,
    color: '#555',
  },
  status: {
    marginTop: 6,
    fontWeight: 'bold',
  },
});