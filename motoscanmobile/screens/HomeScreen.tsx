import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import type { TabParamList } from '../types'; 
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import type { ColorPalette } from '../constants/Colors';


type HomeScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const { i18n, locale, setLocale } = useLocalization(); 
  
  const styles = getStyles(colors);

  const handleLanguageChange = () => {
    if (locale === 'pt') {
      setLocale('es');
    } else if (locale === 'es') {
      setLocale('en');
    } else {
      setLocale('pt');
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.headerButtons}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Ionicons 
            name={isDarkMode ? 'sunny-outline' : 'moon-outline'} 
            size={24} 
            color={colors.tint} 
          />
        </TouchableOpacity>
        
       
        <TouchableOpacity onPress={handleLanguageChange} style={styles.languageButton}>
          <Text style={styles.languageButtonText}>{locale.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('../assets/icon.png')} style={styles.logo} />
      
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


const getStyles = (colors: ColorPalette) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeButton: {
    padding: 10,
  },
  languageButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: colors.tint,
    borderRadius: 5,
  },
  languageButtonText: {
    color: colors.tint,
    fontWeight: 'bold',
    fontSize: 14,
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