// screens/MotoListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
        setMotos(mapped);
      }
    };
    if (isFocused) fetchMotos();
  }, [isFocused]);

  const getStatusColor = (moto: Moto) => {
    if (moto.status.roubada) return '#FF4D4D'; // vermelho
    if (moto.status.falhaMecanica) return '#FFA500'; // laranja
    return '#00C247'; // verde
  };

  const getDescricaoSituacao = (moto: Moto) => {
    if (moto.status.roubada || moto.status.multa) return 'A moto está registrada com um boletim de ocorrência.';
    if (moto.status.falhaMecanica) return 'A moto apresenta falha mecânica e está indisponível.';
    return 'A moto está pronta para uso e não apresenta problemas.';
  };

  const renderItem = ({ item }: { item: Moto }) => (
    <TouchableOpacity
      style={[styles.card, { borderColor: getStatusColor(item) }]} 
      onPress={() => navigation.navigate('MotoDetail', { moto: item })}
    >
      <Image source={item.imagem} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.model}>{item.modelo}</Text>
        <Text>Placa: {item.placa}</Text>
        <Text style={styles.situacao}>{getDescricaoSituacao(item)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes</Text>
      <FlatList
        data={motos}
        keyExtractor={(item, index) => `${item.placa}-${index}`}
        renderItem={renderItem}
      />
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
  situacao: {
    marginTop: 6,
    fontSize: 14,
    color: '#555'
  }
});
