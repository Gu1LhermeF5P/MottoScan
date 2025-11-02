import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { updateMotoAPI } from '../services/api';
import type { RootStackParamList, Moto } from '../types';
import { useTheme } from '../context/ThemeContext';
import type { ColorPalette } from '../constants/Colors';
import i18n from '../i18n.config'; // Importe o i18n

type EditMotoScreenRouteProp = RouteProp<RootStackParamList, 'EditMoto'>;

const EditMotoScreen: React.FC = () => {
  const route = useRoute<EditMotoScreenRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

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
        Alert.alert(i18n.t('editMoto.successTitle'), i18n.t('editMoto.successMessage'));
        navigation.goBack();
      } else {
        Alert.alert(i18n.t('editMoto.errorTitle'), i18n.t('editMoto.errorMessage'));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(i18n.t('editMoto.errorTitle'), i18n.t('editMoto.errorUnexpected'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('editMoto.title')}</Text>

      <Text style={styles.label}>{i18n.t('editMoto.plateLabel')}</Text>
      <Text style={styles.placaText}>{motoOriginal.placa}</Text>

      {/* Reaproveitando a chave de tradução da tela de registro */}
      <Text style={styles.label}>{i18n.t('registerMoto.modelLabel')}</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
        placeholderTextColor={colors.border}
      />
      
      <Text style={styles.label}>{i18n.t('editMoto.zoneLabel')}</Text>
      <TextInput
        style={styles.input}
        value={zona}
        onChangeText={setZona}
        placeholderTextColor={colors.border}
      />

      {/* Reaproveitando a chave de tradução da tela de registro */}
      <Text style={styles.label}>{i18n.t('registerMoto.statusLabel')}</Text>
      <View style={styles.statusContainer}>
        <TouchableOpacity 
            style={[styles.statusButton, falhaMecanica && styles.statusMecanico]}
            onPress={() => setFalhaMecanica(!falhaMecanica)}>
            {/* Reaproveitando a chave de tradução */}
            <Text style={[styles.statusButtonText, falhaMecanica && styles.selectedStatusText]}>
              {i18n.t('registerMoto.statusMaint')}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.statusButton, roubada && styles.statusBO]}
            onPress={() => setRoubada(!roubada)}>
            {/* Reaproveitando a chave de tradução */}
            <Text style={[styles.statusButtonText, roubada && styles.selectedStatusText]}>
              {i18n.t('registerMoto.statusStolen')}
            </Text>
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
          <Text style={styles.saveButtonText}>{i18n.t('editMoto.saveButton')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: ColorPalette) => StyleSheet.create({
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