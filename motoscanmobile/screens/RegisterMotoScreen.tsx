import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList,
  Alert, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { saveMotoToAPI } from '../services/api';
import { RootStackParamList } from '../types/index';
import { useTheme } from '../context/ThemeContext';
import type { ColorPalette } from '../constants/Colors';
import i18n from '../i18n.config'; // Importe o i18n

const motoModelos = [
  { nome: 'MOTO SPORT', imagem: require('../assets/sport-2.webp') },
  { nome: 'POP 110i', imagem: require('../assets/pop.webp') },
  { nome: 'MOTO E', imagem: require('../assets/e-1.webp') },
];

const RegisterMotoScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, isDarkMode } = useTheme();
  const styles = getStyles(colors, isDarkMode);

  const [placa, setPlaca] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState(motoModelos[1]);
  // Ajustamos os status para usarem as chaves de tradução
  const statusOptions = {
    PRONTA: i18n.t('registerMoto.statusReady'),
    MECANICO: i18n.t('registerMoto.statusMaint'),
    BO: i18n.t('registerMoto.statusStolen'),
  };
  const [status, setStatus] = useState<'BO' | 'MECANICO' | 'PRONTA'>('PRONTA');
  const [erroPlaca, setErroPlaca] = useState('');
  const [loading, setLoading] = useState(false);

  const validarPlaca = (texto: string) => {
    const placaFormatada = texto.toUpperCase();
    setPlaca(placaFormatada);
    const placaAntiga = /^[A-Z]{3}[0-9]{4}$/;
    const placaMercosul = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

    if (placaFormatada.length === 7 && !placaAntiga.test(placaFormatada) && !placaMercosul.test(placaFormatada)) {
      setErroPlaca(i18n.t('registerMoto.plateError'));
    } else {
      setErroPlaca('');
    }
  };

  const salvarCadastro = async () => {
    if (!placa.trim() || erroPlaca) {
      Alert.alert(i18n.t('registerMoto.errorTitle'), i18n.t('registerMoto.errorValidation'));
      return;
    }
    setLoading(true);

    const novaMotoPayload = {
      modelo: modeloSelecionado.nome,
      placa,
      zona: 'A1',
      roubada: status === 'BO',
      falhaMecanica: status === 'MECANICO',
      multa: status === 'BO',
    };

    try {
      const motoSalva = await saveMotoToAPI(novaMotoPayload);
      if (motoSalva) {
        Alert.alert(i18n.t('registerMoto.successTitle'), i18n.t('registerMoto.successMessage'));
        navigation.navigate('Motos');
      } else {
        Alert.alert(i18n.t('registerMoto.errorTitle'), i18n.t('registerMoto.errorApi'));
      }
    } catch (error: any) {
      Alert.alert(i18n.t('registerMoto.errorRegister'), error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('registerMoto.title')}</Text>

      <Text style={styles.label}>{i18n.t('registerMoto.plateLabel')}</Text>
      <TextInput
        style={[styles.input, erroPlaca ? styles.inputErro : null]}
        value={placa}
        onChangeText={validarPlaca}
        placeholder={i18n.t('registerMoto.platePlaceholder')}
        placeholderTextColor={colors.border}
        maxLength={7}
        autoCapitalize="characters"
      />
      {erroPlaca ? <Text style={styles.erroTexto}>{erroPlaca}</Text> : null}

      <Text style={styles.label}>{i18n.t('registerMoto.modelLabel')}</Text>
      <FlatList
        horizontal
        data={motoModelos}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.modelBox,
              modeloSelecionado.nome === item.nome && styles.modelBoxSelected
            ]}
            onPress={() => setModeloSelecionado(item)}
          >
            <Image source={item.imagem} style={styles.modelImage} />
            <Text style={styles.modelText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      <Text style={styles.label}>{i18n.t('registerMoto.statusLabel')}</Text>
      <View style={styles.statusContainer}>
        {/* Mapeia as chaves do objeto de status para criar os botões */}
        {(Object.keys(statusOptions) as Array<keyof typeof statusOptions>).map((key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.statusButton,
              status === key && (
                key === 'BO' 
                  ? styles.statusBO
                  : key === 'MECANICO' 
                  ? styles.statusMECANICO 
                  : styles.statusPRONTA
              )
            ]}
            onPress={() => setStatus(key)}
          >
            <Text style={[styles.statusText, status === key && styles.selectedStatusText]}>
              {statusOptions[key]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
        onPress={salvarCadastro}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={styles.saveButtonText}>{i18n.t('registerMoto.saveButton')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: ColorPalette, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
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
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    color: colors.text,
    backgroundColor: colors.card,
  },
  inputErro: {
    borderColor: '#dc3545',
  },
  erroTexto: {
    color: '#dc3545',
    marginBottom: 10,
    fontSize: 13,
  },
  modelBox: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  modelBoxSelected: {
    borderColor: colors.tint,
    backgroundColor: colors.tint + '20',
  },
  modelImage: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  modelText: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.text,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statusButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  statusPRONTA: {
    backgroundColor: '#e6f8ed',
    borderColor: '#00C247',
  },
  statusMECANICO: {
    backgroundColor: '#fff7cc',
    borderColor: '#ffcc00',
  },
  statusBO: {
    backgroundColor: '#ffdddd',
    borderColor: '#ff0000',
  },
  statusText: {
    color: colors.text,
    fontWeight: '600',
  },
  selectedStatusText: {
    color: '#000000',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: colors.tint,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterMotoScreen;