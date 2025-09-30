import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../types/index';
import { useTheme } from '../context/ThemeContext';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
        <Ionicons 
          name={isDarkMode ? 'sunny-outline' : 'moon-outline'} 
          size={24} 
          color={colors.tint} 
        />
      </TouchableOpacity>

      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.welcome}>Bem-vindo ao MotoScan</Text>
      <Text style={styles.description}>Gerencie o status das motos da frota Mottu com agilidade e controle.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastrar Moto')}
      >
        <Text style={styles.buttonText}>Cadastrar Moto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Motos')}
      >
        <Text style={styles.buttonText}>Visualizar Motos</Text>
      </TouchableOpacity>
      
      
    </View>
  );
};


const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  themeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.tint,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.text,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.tint,
    padding: 14,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;