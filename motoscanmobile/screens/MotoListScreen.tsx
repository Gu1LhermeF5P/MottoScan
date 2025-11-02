import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Image, 
    TouchableOpacity, 
    StyleSheet, 
    Alert,
    ActivityIndicator
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getMotosFromAPI, deleteMotoFromAPI } from '../services/api';
import type { RootStackParamList, Moto } from '../types';
import { useTheme } from '../context/ThemeContext';
import type { ColorPalette } from '../constants/Colors';
import { useLocalization } from '../context/LocalizationContext'; // 1. Importe o novo hook

const imageMap: Record<string, any> = {
  'MOTO SPORT': require('../assets/sport-2.webp'),
  'POP': require('../assets/pop.webp'),
  'POP 110i': require('../assets/pop.webp'),
  'MOTO E': require('../assets/e-1.webp'),
  'MOTO ELÉTRICA': require('../assets/e-1.webp')
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MotoList'>;

const MotoListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const { i18n } = useLocalization(); // 2. Obtenha o i18n do contexto
  const styles = getStyles(colors);

  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        setLoading(true);
        const dataFromApi = await getMotosFromAPI();
        const mappedData = dataFromApi.map((moto) => ({
          ...moto,
          imagem: imageMap[moto.modelo] || require('../assets/sport-2.webp')
        }));
        setMotos(mappedData);
      } catch (error) {
        console.error("Erro ao buscar motos:", error);
        Alert.alert(i18n.t('common.error'), i18n.t('motoList.loadError'));
      } finally {
        setLoading(false);
      }
    };
    
    if (isFocused) {
      fetchMotos();
    }
  }, [isFocused]);

  const deleteMoto = async (placa: string) => {
    Alert.alert(
      i18n.t('motoList.deleteConfirmTitle'),
      i18n.t('motoList.deleteConfirmMessage', { plate: placa }),
      [
        { text: i18n.t('common.cancel'), style: 'cancel' },
        {
          text: i18n.t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            const success = await deleteMotoFromAPI(placa);
            if (success) {
              setMotos(prevMotos => prevMotos.filter(moto => moto.placa !== placa));
            } else {
              Alert.alert(i18n.t('common.error'), i18n.t('motoList.deleteError'));
            }
          },
        },
      ]
    );
  };
  
  const getStatusColor = (moto: Moto) => {
    if (moto.roubada) return '#dc3545';
    if (moto.falhaMecanica) return '#ffc107';
    return '#28a745';
  };

  const renderItem = ({ item }: { item: Moto }) => (
    // O TouchableOpacity para o card de detalhes já estava no código anterior,
    // mas não foi enviado neste. Vou adicioná-lo de volta.
    <TouchableOpacity 
      style={[styles.card, { borderColor: getStatusColor(item) }]}
      onPress={() => navigation.navigate('MotoDetail', { moto: item })}
    >
      <Image source={item.imagem} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.model}>{item.modelo}</Text>
        <Text style={styles.placaText}>{i18n.t('common.plate')}: {item.placa}</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPressIn={(e) => e.stopPropagation()} // Evita o clique no card
          onPress={() => navigation.navigate('EditMoto', { moto: item })}
        >
          <Text style={styles.editText}>{i18n.t('common.edit')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPressIn={(e) => e.stopPropagation()} // Evita o clique no card
          onPress={() => deleteMoto(item.placa)}
        >
          <Text style={styles.deleteText}>{i18n.t('common.delete')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={{ color: colors.text, marginTop: 10 }}>
          {i18n.t('motoList.loading')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{i18n.t('motoList.title')}</Text>
      {motos.length === 0 ? (
        <Text style={styles.emptyText}>{i18n.t('motoList.empty')}</Text>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.placa}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

// A função getStyles não muda
const getStyles = (colors: ColorPalette) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: colors.card,
    justifyContent: 'space-between',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  model: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  placaText: {
    color: colors.text,
  },
  emptyText: {
    fontSize: 16,
    color: colors.border,
    textAlign: 'center',
    marginTop: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  actionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
    marginBottom: 8,
  },
  editText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#dc354520',
    borderRadius: 6,
  },
  deleteText: {
    color: '#c82333',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MotoListScreen;