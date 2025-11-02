import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../types/index';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import i18n from '../i18n.config'; // 1. Importe o i18n
import type { ColorPalette } from '../constants/Colors'; // Importe o tipo de Cor

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const { logout } = useAuth(); // A lógica de logout continua no App.tsx, mas a de tema está aqui
  
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      {/* Botão para trocar o tema */}
      <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
        <Ionicons 
          name={isDarkMode ? 'sunny-outline' : 'moon-outline'} 
          size={24} 
          color={colors.tint} 
        />
      </TouchableOpacity>

      <Image source={require('../assets/icon.png')} style={styles.logo} />
      
      {/* 2. Textos atualizados para usar o i18n */}
      <Text style={styles.welcome}>{i18n.t('home.welcome')}</Text>
      <Text style={styles.description}>{i18n.t('home.description')}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastrar Moto')}
      >
        <Text style={styles.buttonText}>{i18n.t('home.register_moto_button')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Motos')}
      >
        <Text style={styles.buttonText}>{i18n.t('home.view_motos_button')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: ColorPalette) => StyleSheet.create({ // Use o tipo ColorPalette
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