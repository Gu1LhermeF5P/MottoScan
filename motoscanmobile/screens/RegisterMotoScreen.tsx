import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

const motoModels = [
  { name: 'MOTO SPORT', image: require('../assets/sport-2.webp') },
  { name: 'POP', image: require('../assets/pop.webp') },
  { name: 'MOTO ELÉTRICA', image: require('../assets/e-1.webp') },
];

const RegisterMotoScreen: React.FC = () => {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!placa || !modelo) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    // Simule salvar com AsyncStorage
    Alert.alert('Sucesso', `Moto ${modelo} com placa ${placa} cadastrada!`);
    setPlaca('');
    setModelo(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Moto</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a placa"
        placeholderTextColor="#888"
        value={placa}
        onChangeText={setPlaca}
      />

      <Text style={styles.subtitle}>Selecione o modelo:</Text>
      <View style={styles.modelContainer}>
        {motoModels.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.modelCard,
              modelo === item.name && styles.modelCardSelected,
            ]}
            onPress={() => setModelo(item.name)}
          >
            <Image source={item.image} style={styles.modelImage} />
            <Text style={styles.modelName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar Moto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterMotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#00C247',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#00C247',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  modelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  modelCard: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
    padding: 8,
  },
  modelCardSelected: {
    borderColor: '#00C247',
    backgroundColor: '#E6F9F0',
  },
  modelImage: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  modelName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: '#00C247',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
