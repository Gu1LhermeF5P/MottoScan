// screens/SettingsScreen.tsx (agora transformada em Pátio)
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PatioScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Área do Pátio</Text>
      <Text style={styles.subtitle}>Visualize e gerencie as motos por filial.</Text>
    </View>
  );
};

export default PatioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00C247',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
