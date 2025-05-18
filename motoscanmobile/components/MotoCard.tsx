import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageStyle, ViewStyle } from 'react-native';
import { Moto } from '../types';

type MotoCardProps = {
  moto: Moto;
  style?: ViewStyle | ImageStyle;
  onPress?: () => void;
};

export default function MotoCard({ moto, style, onPress }: MotoCardProps) {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Image source={moto.imagem} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.modelo}>{moto.modelo}</Text>
        <Text style={styles.placa}>{moto.placa}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    position: 'absolute',
    width: 120,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 3,
  },
  image: { width: 40, height: 40, borderRadius: 4 },
  info: { marginLeft: 8 },
  modelo: { fontWeight: 'bold' },
  placa: { color: '#666' },
});
