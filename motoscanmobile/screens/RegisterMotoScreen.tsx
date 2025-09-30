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
  const [status, setStatus] = useState<'BO' | 'MECANICO' | 'PRONTA'>('PRONTA');
  const [erroPlaca, setErroPlaca] = useState('');
  const [loading, setLoading] = useState(false);

  const validarPlaca = (texto: string) => {
    const placaFormatada = texto.toUpperCase();
    setPlaca(placaFormatada);
    const placaAntiga = /^[A-Z]{3}[0-9]{4}$/;
    const placaMercosul = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

    if (placaFormatada.length === 7 && !placaAntiga.test(placaFormatada) && !placaMercosul.test(placaFormatada)) {
      setErroPlaca('Placa inválida. Use o formato ABC1234 ou ABC1D23.');
    } else {
      setErroPlaca('');
    }
  };

  const salvarCadastro = async () => {
    if (!placa.trim() || erroPlaca) {
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário.');
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
        Alert.alert('Sucesso!', 'Moto cadastrada com sucesso.');
        navigation.navigate('Motos');
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar a moto.');
      }
    } catch (error: any) {
      Alert.alert('Erro de Cadastro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Moto</Text>

      <Text style={styles.label}>Placa (ex: ABC1234 ou ABC1D23):</Text>
      <TextInput
        style={[styles.input, erroPlaca ? styles.inputErro : null]}
        value={placa}
        onChangeText={validarPlaca}
        placeholder="Digite a placa"
        placeholderTextColor={colors.border}
        maxLength={7}
        autoCapitalize="characters"
      />
      {erroPlaca ? <Text style={styles.erroTexto}>{erroPlaca}</Text> : null}

      <Text style={styles.label}>Modelo:</Text>
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

      <Text style={styles.label}>Status:</Text>
      <View style={styles.statusContainer}>
        {['PRONTA', 'MECANICO', 'BO'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[
              styles.statusButton,
              status === s && (
                s === 'BO' 
                  ? styles.statusBOSelected 
                  : s === 'MECANICO' 
                  ? styles.statusMECANICOSelected 
                  : styles.statusPRONTASelected
              )
            ]}
            onPress={() => setStatus(s as typeof status)}
          >
            <Text style={[
              styles.statusText, 
              status === s && { 
                color: isDarkMode ? '#FFFFFF' : '#000000' // Texto branco no modo escuro, preto no claro
              }
            ]}>
              {s}
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
          <Text style={styles.saveButtonText}>Salvar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: any, isDarkMode: boolean) => StyleSheet.create({
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
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  statusPRONTASelected: { 
    backgroundColor: '#28a745',
    borderColor: '#218838', 
  },
  statusMECANICOSelected: { 
    backgroundColor: '#ffc107',
    borderColor: '#e0a800', 
  },
  statusBOSelected: { 
    backgroundColor: '#dc3545',
    borderColor: '#c82333', 
  },
  statusText: { 
    color: colors.text,
    fontWeight: '600' 
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