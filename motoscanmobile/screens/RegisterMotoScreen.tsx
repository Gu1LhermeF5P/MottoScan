// screens/RegisterMotoScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const motoModelos = [
  { nome: 'MOTO SPORT', imagem: require('../assets/sport-2.webp') },
  { nome: 'POP', imagem: require('../assets/pop.webp') },
  { nome: 'MOTO E', imagem: require('../assets/e-1.webp') },
];

const RegisterMotoScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [placa, setPlaca] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState(motoModelos[0]);
  const [status, setStatus] = useState<'BO' | 'MECANICO' | 'PRONTA'>('PRONTA');
  const [erroPlaca, setErroPlaca] = useState('');

  const validarPlaca = (texto: string) => {
    const placaFormatada = texto.toUpperCase();
    setPlaca(placaFormatada);

    // Valida formatos: Antiga (ABC1234) ou Mercosul (ABC1D23)
    const placaAntiga = /^[A-Z]{3}[0-9]{4}$/;
    const placaMercosul = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

    if (
      placaFormatada.length === 7 &&
      !placaAntiga.test(placaFormatada) &&
      !placaMercosul.test(placaFormatada)
    ) {
      setErroPlaca('Placa inválida. Use o formato ABC1234 ou ABC1D23.');
    } else {
      setErroPlaca('');
    }
  };

  const salvarCadastro = async () => {
    if (!placa.trim()) {
      setErroPlaca('Por favor, insira a placa da moto.');
      return;
    }

    if (erroPlaca) {
      alert('Corrija o erro na placa antes de continuar.');
      return;
    }

    const novaMoto = {
      modelo: modeloSelecionado.nome,
      placa,
      imagem: modeloSelecionado.imagem,
      zona: 'A',
      status: {
        roubada: status === 'BO',
        falhaMecanica: status === 'MECANICO',
        multa: status === 'BO',
      }
    };

    try {
      const data = await AsyncStorage.getItem('motos');
      const listaAtual = data ? JSON.parse(data) : [];
      const novaLista = [...listaAtual, novaMoto];
      await AsyncStorage.setItem('motos', JSON.stringify(novaLista));
      navigation.navigate('Motos');
    } catch (error) {
      console.error('Erro ao salvar moto:', error);
      alert('Erro ao salvar a moto.');
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
        {['BO', 'MECANICO', 'PRONTA'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[
              styles.statusButton,
              status === s &&
              (s === 'BO'
                ? styles.statusBO
                : s === 'MECANICO'
                ? styles.statusMECANICO
                : styles.statusPRONTA)
            ]}
            onPress={() => setStatus(s as typeof status)}
          >
            <Text style={styles.statusText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={salvarCadastro}>
        <Text style={styles.saveButtonText}>Salvar</Text>
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
  statusBO: {
    backgroundColor: '#ffdddd',
    borderColor: '#ff0000',
  },
  statusMECANICO: {
    backgroundColor: '#fff7cc',
    borderColor: '#ffcc00',
  },
  statusPRONTA: {
    backgroundColor: '#e6f8ed',
    borderColor: '#00C247',
  },
  statusText: {
    color: '#000',
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#00C247',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
