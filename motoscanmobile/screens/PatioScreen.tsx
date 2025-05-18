import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Moto, Status, RootStackParamList } from '../types';
import { getMotos, saveMoto } from '../services/storage';
import MotoCard from '../components/MotoCard';

type PatioScreenProps = NativeStackScreenProps<RootStackParamList, 'Patio'>;

const LIMITE_POR_ZONA = 10;

const zonas = [
  { key: 'BO', label: 'Zona BO', color: 'rgba(255, 0, 0, 0.3)', area: { left: 10, top: 10 } },
  { key: 'MECANICO', label: 'Zona Falha Mecânica', color: 'rgba(128, 128, 128, 0.3)', area: { left: 150, top: 10 } },
  { key: 'PRONTA', label: 'Zona Pronta', color: 'rgba(0, 196, 71, 0.3)', area: { left: 290, top: 10 } },
];

function getStatus(moto: Moto): Status {
  if (moto.status?.multa) return 'BO';
  if (moto.status?.falhaMecanica) return 'MECANICO';
  return 'PRONTA';
}

export default function PatioScreen({ route }: PatioScreenProps) {
  const motoNova = route.params?.moto;

  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    async function load() {
      let dados = await getMotos();

      // Filtra motos inválidas (sem status)
      dados = dados.filter(m => m.status !== undefined);

      // Se chegou uma moto nova, adiciona se não existir
      if (motoNova && !dados.some(m => m.placa === motoNova.placa)) {
        dados.push(motoNova);
        await saveMoto(motoNova);
      }

      setMotos(dados);
    }
    load();
  }, [motoNova]);

  function handlePress(moto: Moto) {
    Alert.alert(
      'Detalhes da Moto',
      `Modelo: ${moto.modelo}\nPlaca: ${moto.placa}\nStatus: ${getStatus(moto)}`
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mapa do Pátio</Text>

      {zonas.map((zona) => {
        const motosZona = motos.filter(m => getStatus(m) === zona.key);

        if (motosZona.length >= LIMITE_POR_ZONA) {
          Alert.alert('Atenção', `A ${zona.label} está cheia! Limite: ${LIMITE_POR_ZONA} motos.`);
        }

        return (
          <View
            key={zona.key}
            style={[styles.zone, { backgroundColor: zona.color, left: zona.area.left, top: zona.area.top }]}
          >
            <Text style={styles.zoneTitle}>{zona.label}</Text>

            {motosZona.map((moto, index) => {
              const posX = 10;
              const posY = 30 + index * 60;

              return (
                <MotoCard
                  key={moto.placa}
                  moto={moto}
                  style={{ position: 'absolute', left: posX, top: posY }}
                  onPress={() => handlePress(moto)}
                />
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#00C247',
  },
  zone: {
    position: 'relative',
    width: 130,
    height: 400,
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
  },
  zoneTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
});
