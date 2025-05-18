// services/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moto } from '../types';

const STORAGE_KEY = '@motos';

export async function saveMoto(newMoto: Moto) {
  try {
    const storedMotos = await AsyncStorage.getItem(STORAGE_KEY);
    const motos: Moto[] = storedMotos ? JSON.parse(storedMotos) : [];
    motos.push(newMoto);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(motos));
  } catch (e) {
    console.error('Erro ao salvar moto', e);
  }
}

export async function getMotos(): Promise<Moto[]> {
  try {
    const storedMotos = await AsyncStorage.getItem(STORAGE_KEY);
    return storedMotos ? JSON.parse(storedMotos) : [];
  } catch (e) {
    console.error('Erro ao carregar motos', e);
    return [];
  }
}
