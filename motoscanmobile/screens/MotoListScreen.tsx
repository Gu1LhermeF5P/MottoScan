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

// Importe suas funções da API e os tipos
import { getMotosFromAPI, deleteMotoFromAPI } from '../services/api';
import type { RootStackParamList, Moto } from '../types';

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
        Alert.alert("Erro", "Não foi possível carregar a lista de motos.");
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
      'Confirmar Exclusão',
      `Deseja realmente apagar a moto de placa ${placa}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteMotoFromAPI(placa);
            if (success) {
              setMotos(prevMotos => prevMotos.filter(moto => moto.placa !== placa));
            } else {
              Alert.alert('Erro', 'Não foi possível excluir a moto.');
            }
          },
        },
      ]
    );
  };
  
  const getStatusColor = (moto: Moto) => {
    if (moto.roubada) return '#FF4D4D';
    if (moto.falhaMecanica) return '#FFA500';
    return '#00C247';
  };

  const renderItem = ({ item }: { item: Moto }) => (
    <View style={[styles.card, { borderColor: getStatusColor(item) }]}>
      <Image source={item.imagem} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.model}>{item.modelo}</Text>
        <Text>Placa: {item.placa}</Text>
      </View>
      
      {/* Container para os botões de ação */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.editButton} 
          // Navega para a tela 'EditMoto' passando os dados do item
          onPress={() => navigation.navigate('EditMoto', { moto: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteMoto(item.placa)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00C247" />
        <Text>Carregando motos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Motos</Text>
      {motos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma moto cadastrada no momento.</Text>
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

export default MotoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C247',
    marginBottom: 16
  },
  card: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-between', // Adicionado para alinhar os botões
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 16
  },
  info: {
    flex: 1
  },
  model: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // --- ESTILOS ADICIONADOS ---
  actionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginBottom: 8,
  },
  editText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffdddd',
    borderRadius: 6,
  },
  deleteText: {
    color: '#c53030',
    fontWeight: 'bold',
    fontSize: 14,
  },
});