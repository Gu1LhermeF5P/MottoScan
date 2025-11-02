import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, Platform } from 'react-native'; 
import Constants from 'expo-constants';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import type { ColorPalette } from '../constants/Colors';

const AboutScreen: React.FC = () => {
  const { colors } = useTheme();
  const { i18n } = useLocalization();
  const styles = getStyles(colors);

  const appVersion = Constants.expoConfig?.version || '1.0.0';
  const commitHash = Constants.expoConfig?.extra?.commitHash || 'N/A';

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>MotoScan</Text>
      
      <Text style={styles.text}>
        {i18n.t('about.description')}
      </Text>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{i18n.t('about.version')}:</Text>
          <Text style={styles.infoValue}>{appVersion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{i18n.t('about.commit')}:</Text>
          <Text style={styles.infoValue}>{commitHash.substring(0, 7)}</Text>
        </View>
      </View>

      <Text style={styles.footer}>{i18n.t('about.developedBy')}</Text>
      
      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/SeuUsuario')}>
        <Text style={styles.link}>Guilherme Francisco</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/OutroUsuario')}>
        <Text style={styles.link}>Larissa de Freitas</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: ColorPalette) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.tint,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  infoBox: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 20,
    width: '95%',
    marginBottom: 30,
    borderColor: colors.border,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', 
  },
  footer: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: colors.tint,
    textDecorationLine: 'underline',
    marginBottom: 5,
  }
});

export default AboutScreen;