import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList,
  Alert, ActivityIndicator // Importe Alert e ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Importe o serviço da API e os tipos
import { saveMotoToAPI } from '../services/api';
import { RootStackParamList } from '../types/index';

const motoModelos = [
  { nome: 'MOTO SPORT', imagem: require('../assets/sport-2.webp') },
  { nome: 'POP 110i', imagem: require('../assets/pop.webp') },
  { nome: 'MOTO E', imagem: require('../assets/e-1.webp') },
];

const RegisterMotoScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [placa, setPlaca] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState(motoModelos[1]); // Deixei a POP como padrão
  const [status, setStatus] = useState<'BO' | 'MECANICO' | 'PRONTA'>('PRONTA');
  const [erroPlaca, setErroPlaca] = useState('');
  const [loading, setLoading] = useState(false); // Novo estado para o loading

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

    // O objeto enviado para a API deve ser "achatado"
    const novaMotoPayload = {
      modelo: modeloSelecionado.nome,
      placa,
      zona: 'A1', // Definindo uma zona padrão
      roubada: status === 'BO',
      falhaMecanica: status === 'MECANICO',
      multa: status === 'BO', // Exemplo, ajuste conforme sua regra
    };

    try {
      const motoSalva = await saveMotoToAPI(novaMotoPayload);
      if (motoSalva) {
        Alert.alert('Sucesso!', 'Moto cadastrada com sucesso.');
        navigation.navigate('Motos'); // Navega para a lista para ver a nova moto
      } else {
         // O erro de placa duplicada já é tratado no serviço da API
         // Podemos adicionar um alerta genérico aqui
         Alert.alert('Erro', 'Não foi possível cadastrar a moto.');
      }
    } catch (error: any) {
        // Captura o erro específico de placa duplicada lançado pelo serviço
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
              status === s && (s === 'BO' ? styles.statusBO : s === 'MECANICO' ? styles.statusMECANICO : styles.statusPRONTA)
            ]}
            onPress={() => setStatus(s as typeof status)}
          >
            <Text style={styles.statusText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
        onPress={salvarCadastro}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Salvar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RegisterMotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C247',
    marginBottom: 20,
    alignSelf: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  inputErro: {
    borderColor: 'red',
  },
  erroTexto: {
    color: 'red',
    marginBottom: 10,
    fontSize: 13,
  },
  modelBox: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  modelBoxSelected: {
    borderColor: '#00C247',
    backgroundColor: '#e6f8ed',
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
    borderColor: '#ccc',
    alignItems: 'center',
  },
  statusPRONTA: { backgroundColor: '#e6f8ed', borderColor: '#00C247' },
  statusMECANICO: { backgroundColor: '#fff7cc', borderColor: '#ffcc00' },
  statusBO: { backgroundColor: '#ffdddd', borderColor: '#ff0000' },
  statusText: { color: '#000', fontWeight: '600' },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#00C247',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#9adba9',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});