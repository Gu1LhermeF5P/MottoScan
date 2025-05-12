// screens/MotoDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MotoDetailScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Detalhes da Moto</Text>
      {/* Aqui futuramente pode-se mostrar detalhes baseados em seleção */}
    </View>
  );
};

export default MotoDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
