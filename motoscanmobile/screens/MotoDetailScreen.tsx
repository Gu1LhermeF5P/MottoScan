import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import type { ColorPalette } from '../constants/Colors';
import i18n from '../i18n.config';
import type { RootStackParamList, Moto } from '../types';

type MotoDetailsScreenRouteProp = RouteProp<RootStackParamList, 'MotoDetail'>;


const imageMap: Record<string, any> = {
  'MOTO SPORT': require('../assets/sport-2.webp'),
  'POP': require('../assets/pop.webp'),
  'POP 110i': require('../assets/pop.webp'),
  'MOTO E': require('../assets/e-1.webp'),
  'MOTO ELÉTRICA': require('../assets/e-1.webp')
};

const MotoDetailsScreen: React.FC = () => {
  const route = useRoute<MotoDetailsScreenRouteProp>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { moto } = route.params;

  // Função para pegar o texto e a cor do status
  const getStatusInfo = (moto: Moto) => {
    if (moto.roubada) {
      return { text: i18n.t('registerMoto.statusStolen'), color: styles.statusBO };
    }
    if (moto.falhaMecanica) {
      return { text: i18n.t('registerMoto.statusMaint'), color: styles.statusMecanico };
    }
    return { text: i18n.t('registerMoto.statusReady'), color: styles.statusPronta };
  };

  const statusInfo = getStatusInfo(moto);
  const imagem = imageMap[moto.modelo] || require('../assets/sport-2.webp');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('motoDetail.title')}</Text>
      
      <Image source={imagem} style={styles.image} />
      
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{i18n.t('motoDetail.model')}:</Text>
          <Text style={styles.value}>{moto.modelo}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{i18n.t('common.plate')}:</Text>
          <Text style={styles.value}>{moto.placa}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{i18n.t('motoDetail.zone')}:</Text>
          <Text style={styles.value}>{moto.zona}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{i18n.t('motoDetail.status')}:</Text>
          <View style={[styles.statusBadge, statusInfo.color]}>
            <Text style={styles.statusText}>{statusInfo.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const getStyles = (colors: ColorPalette) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.tint,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 20,
    width: '100%',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  value: {
    fontSize: 16,
    color: colors.text,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  statusText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  statusPronta: { backgroundColor: '#e6f8ed', borderColor: '#00C247', borderWidth: 1 },
  statusMecanico: { backgroundColor: '#fff7cc', borderColor: '#ffcc00', borderWidth: 1 },
  statusBO: { backgroundColor: '#ffdddd', borderColor: '#ff0000', borderWidth: 1 },
});

export default MotoDetailsScreen;