import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, Moto } from '../types';

const imageMap: Record<string, any> = {
  'MOTO SPORT': require('../assets/sport-2.webp'),
  'POP': require('../assets/pop.webp'),
  'MOTO E': require('../assets/e-1.webp'),
  'MOTO ELÉTRICA': require('../assets/e-1.webp')
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MotoList'>;

const MotoListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [motos, setMotos] = useState<Moto[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchMotos = async () => {
      const data = await AsyncStorage.getItem('motos');
      if (data) {
        const parsed = JSON.parse(data);
        const mapped = parsed.map((moto: any) => ({
          ...moto,
          imagem: imageMap[moto.modelo] || require('../assets/sport-2.webp')
        }));
        setMotos(mapped.reverse());
      } else {
        setMotos([]);
      }
    };
    if (isFocused) fetchMotos();
  }, [isFocused]);

  const getStatusColor = (moto: Moto) => {
    if (moto.status.roubada) return '#FF4D4D'; // vermelho
    if (moto.status.falhaMecanica) return '#FFA500'; // laranja
    return '#00C247'; // verde
  };

  const renderItem = ({ item }: { item: Moto }) => (
  <View style={[styles.card, { borderColor: getStatusColor(item) }]}>
    <Image source={item.imagem} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.model}>{item.modelo}</Text>
      <Text>Placa: {item.placa}</Text>
    </View>
  </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Motos</Text>
      {motos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma moto cadastrada no momento.</Text>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item, index) => `${item.placa}-${index}`}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default MotoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C247',
    marginBottom: 16
  },
  card: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 16
  },
  info: {
    flex: 1
  },
  model: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40
  }
});
