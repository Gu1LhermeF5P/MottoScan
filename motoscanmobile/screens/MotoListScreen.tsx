// screens/MotoListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Moto {
  placa: string;
  status: string;
}

const MotoListScreen: React.FC = () => {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    const fetchMotos = async () => {
      const stored = await AsyncStorage.getItem('motos');
      if (stored) setMotos(JSON.parse(stored));
    };
    fetchMotos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Motos</Text>
      <FlatList
        data={motos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Placa: {item.placa}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MotoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});