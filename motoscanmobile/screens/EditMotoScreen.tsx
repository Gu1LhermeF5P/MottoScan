import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { updateMotoAPI } from '../services/api';
import type { RootStackParamList, Moto } from '../types';

// Tipagem para a rota, para podermos pegar os parâmetros com segurança
type EditMotoScreenRouteProp = RouteProp<RootStackParamList, 'EditMoto'>;

const EditMotoScreen: React.FC = () => {
  const route = useRoute<EditMotoScreenRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Pegamos a moto original que foi passada como parâmetro na navegação
  const { moto: motoOriginal } = route.params;

  // Iniciamos o estado do formulário com os dados da moto original
  const [modelo, setModelo] = useState(motoOriginal.modelo);
  const [zona, setZona] = useState(motoOriginal.zona);
  const [falhaMecanica, setFalhaMecanica] = useState(motoOriginal.falhaMecanica);
  const [roubada, setRoubada] = useState(motoOriginal.roubada);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const dadosAtualizados: Partial<Moto> = {
      modelo,
      zona,
      falhaMecanica,
      roubada,
      multa: roubada, // Exemplo: se tem B.O., consideramos que tem multa
    };

    try {
      const motoAtualizada = await updateMotoAPI(motoOriginal.placa, dadosAtualizados);
      if (motoAtualizada) {
        Alert.alert('Sucesso', 'Moto atualizada com sucesso!');
        navigation.goBack(); // Volta para a tela anterior (a lista)
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar a moto.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Moto</Text>

      <Text style={styles.label}>Placa (não editável)</Text>
      <Text style={styles.placaText}>{motoOriginal.placa}</Text>

      <Text style={styles.label}>Modelo:</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
      />
      
      <Text style={styles.label}>Zona:</Text>
      <TextInput
        style={styles.input}
        value={zona}
        onChangeText={setZona}
      />

      <Text style={styles.label}>Status:</Text>
      <View style={styles.statusContainer}>
        <TouchableOpacity 
            style={[styles.statusButton, falhaMecanica && styles.statusMecanico]}
            onPress={() => setFalhaMecanica(!falhaMecanica)}>
            <Text>Manutenção</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.statusButton, roubada && styles.statusBO]}
            onPress={() => setRoubada(!roubada)}>
            <Text>Com B.O.</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity 
        style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00C247', marginBottom: 20, alignSelf: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6, marginTop: 10 },
  placaText: { fontSize: 18, color: '#666', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 5, fontSize: 16 },
  statusContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  statusButton: { padding: 12, borderWidth: 1, borderRadius: 8, borderColor: '#ccc' },
  statusMecanico: { backgroundColor: '#fff7cc', borderColor: '#ffcc00' },
  statusBO: { backgroundColor: '#ffdddd', borderColor: '#ff0000' },
  saveButton: { marginTop: 30, backgroundColor: '#00C247', padding: 14, borderRadius: 8, alignItems: 'center' },
  saveButtonDisabled: { backgroundColor: '#9adba9' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});


export default EditMotoScreen;