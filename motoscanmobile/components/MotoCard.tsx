import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Moto } from '../types';

export default function MotoCard({ modelo, placa }: Moto) {
  return (
    <View style={styles.card}>
      <Text style={styles.modelo}>{modelo}</Text>
      <Text style={styles.placa}>{placa}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#f2f2f2', padding: 15, borderRadius: 8, marginBottom: 10 },
  modelo: { fontSize: 16, fontWeight: 'bold' },
  placa: { fontSize: 14, color: '#666' },
});
