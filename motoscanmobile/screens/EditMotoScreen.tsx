import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { updateMotoAPI } from '../services/api';
import type { RootStackParamList, Moto } from '../types';
import { useTheme } from '../context/ThemeContext'; // Importe o hook do tema

type EditMotoScreenRouteProp = RouteProp<RootStackParamList, 'EditMoto'>;

const EditMotoScreen: React.FC = () => {
  const route = useRoute<EditMotoScreenRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme(); // Obtenha as cores do tema
  const styles = getStyles(colors); // Crie os estilos dinâmicos

  const { moto: motoOriginal } = route.params;

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
      multa: roubada,
    };

    try {
      const motoAtualizada = await updateMotoAPI(motoOriginal.placa, dadosAtualizados);
      if (motoAtualizada) {
        Alert.alert('Sucesso', 'Moto atualizada com sucesso!');
        navigation.goBack();
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
        placeholderTextColor={colors.border}
      />
      
      <Text style={styles.label}>Zona:</Text>
      <TextInput
        style={styles.input}
        value={zona}
        onChangeText={setZona}
        placeholderTextColor={colors.border}
      />

      <Text style={styles.label}>Status:</Text>
      <View style={styles.statusContainer}>
        <TouchableOpacity 
            style={[styles.statusButton, falhaMecanica && styles.statusMecanico]}
            onPress={() => setFalhaMecanica(!falhaMecanica)}>
            <Text style={[styles.statusButtonText, falhaMecanica && styles.selectedStatusText]}>Manutenção</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.statusButton, roubada && styles.statusBO]}
            onPress={() => setRoubada(!roubada)}>
            <Text style={[styles.statusButtonText, roubada && styles.selectedStatusText]}>Com B.O.</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: colors.background 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: colors.tint, 
    marginBottom: 20, 
    alignSelf: 'center' 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 6, 
    marginTop: 10,
    color: colors.text
  },
  placaText: { 
    fontSize: 18, 
    color: colors.text, 
    padding: 10, 
    backgroundColor: colors.card, 
    borderRadius: 8 
  },
  input: { 
    borderWidth: 1, 
    borderColor: colors.border, 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 5, 
    fontSize: 16,
    color: colors.text
  },
  statusContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginVertical: 10 
  },
  statusButton: { 
    padding: 12, 
    borderWidth: 1, 
    borderRadius: 8, 
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statusButtonText: {
    color: colors.text,
    fontWeight: '500',
  },
  selectedStatusText: {
    color: '#000000',
  },
  statusMecanico: { 
    backgroundColor: '#fff7cc', 
    borderColor: '#ffcc00' 
  },
  statusBO: { 
    backgroundColor: '#ffdddd', 
    borderColor: '#ff0000' 
  },
  saveButton: { 
    marginTop: 30, 
    backgroundColor: colors.tint, 
    padding: 14, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  saveButtonDisabled: { 
    opacity: 0.7 
  },
  saveButtonText: { 
    color: colors.background, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});

export default EditMotoScreen;