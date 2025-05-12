import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moto } from '../types';

const MOTO_KEY = '@motos';

export async function saveMoto(moto: Moto): Promise<void> {
  const motos = await getMotos();
  motos.push(moto);
  await AsyncStorage.setItem(MOTO_KEY, JSON.stringify(motos));
}

export async function getMotos(): Promise<Moto[]> {
  const json = await AsyncStorage.getItem(MOTO_KEY);
  return json != null ? JSON.parse(json) : [];
}
