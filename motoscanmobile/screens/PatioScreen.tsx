
import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Moto } from '../types';


const ZONAS = ['A', 'B', 'C', 'D', 'E', 'F'];
const STATUS_CORES: Record<string, string> = {
  BO: '#FF4C4C',
  MECANICO: '#FFD700',
  PRONTA: '#00C247',
};

const PatioScreen = () => {
  const navigation = useNavigation();
  const [motos, setMotos] = useState<Moto[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<'BO' | 'MECANICO' | 'PRONTA' | null>(null);
  const [modalMoto, setModalMoto] = useState<Moto | null>(null);

  const carregarMotos = async () => {
    const data = await AsyncStorage.getItem('motos');
    if (data) {
      const lista = JSON.parse(data);
      setMotos(lista);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarMotos);
    return unsubscribe;
  }, [navigation]);

  const motosFiltradas = filtroStatus
    ? motos.filter((m) => {
        if (filtroStatus === 'BO') return m.status.roubada;
        if (filtroStatus === 'MECANICO') return m.status.falhaMecanica;
        if (filtroStatus === 'PRONTA') return !m.status.roubada && !m.status.falhaMecanica;
        return true;
      })
    : motos;

  const getStatus = (m: Moto): 'BO' | 'MECANICO' | 'PRONTA' => {
    if (m.status.roubada) return 'BO';
    if (m.status.falhaMecanica) return 'MECANICO';
    return 'PRONTA';
  };

  const motosPorStatus: Record<'PRONTA' | 'BO' | 'MECANICO', Moto[]> = {
    PRONTA: [],
    BO: [],
    MECANICO: [],
  };
  motosFiltradas.forEach((moto) => {
    motosPorStatus[getStatus(moto)].push(moto);
  });

  const zonasMapeadas = [
    { zona: 'A', status: 'PRONTA' },
    { zona: 'B', status: 'PRONTA' },
    { zona: 'C', status: 'BO' },
    { zona: 'D', status: 'BO' },
    { zona: 'E', status: 'MECANICO' },
    { zona: 'F', status: 'MECANICO' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Icon name="map" size={24} color="#00C247" style={{ marginRight: 8 }} />
        <Text style={styles.title}>Pátio - Filial Zona Leste</Text>
      </View>

      <View style={styles.filterRow}>
      {(['PRONTA', 'BO', 'MECANICO'] as const).map((s) => (
        <TouchableOpacity
          key={s}
          style={[styles.filterButton, filtroStatus === s && { backgroundColor: STATUS_CORES[s] }]}
          onPress={() => setFiltroStatus(filtroStatus === s ? null : s)}
        >
          <Text style={styles.filterText}>{s}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <TouchableOpacity
      style={styles.verTodasButton}
      onPress={() => setFiltroStatus(null)}
    >
      <Text style={styles.verTodasText}>Ver todas as motos no pátio</Text>
    </TouchableOpacity>

      {zonasMapeadas.map(({ zona, status }, i) => {
        const indexOffset = zonasMapeadas.filter((z) => z.status === status).findIndex((z) => z.zona === zona) * 5;
        const motosStatus = motosPorStatus[status].slice(indexOffset, indexOffset + 5);
        const quadrantes = Array(5).fill(null).map((_, idx) => motosStatus[idx] || null);

        return (
          <View key={zona} style={styles.zonaContainer}>
            <Text style={styles.zonaLabel}>Zona {zona} - <Text style={styles.hint}>Toque em uma moto para detalhes</Text></Text>
            <View style={styles.gridRow}>
              {quadrantes.map((moto, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.gridBox, moto && { backgroundColor: STATUS_CORES[getStatus(moto)] }]}
                  onPress={() => moto && setModalMoto(moto)}
                  disabled={!moto}
                >
                  {moto ? <Icon name="motorbike" size={20} color="#fff" /> : null}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      })}

      <Modal visible={!!modalMoto} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalMoto && (
              <>
                <Text style={styles.modalTitle}>Detalhes da Moto</Text>
                <Text>Modelo: {modalMoto.modelo}</Text>
                <Text>Placa: {modalMoto.placa}</Text>
                <Text>Status: {getStatus(modalMoto)}</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalMoto(null)}
                >
                  <Text style={styles.modalButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PatioScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#00C247' },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  filterButton: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  filterText: { fontWeight: 'bold' },
  zonaContainer: { marginVertical: 10 },
  zonaLabel: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  hint: { color: '#666', fontSize: 14, fontWeight: '400' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  gridBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 0,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#00C247',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
  verTodasButton: {
  backgroundColor: '#00C247',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 10,
},
verTodasText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

});
