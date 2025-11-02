import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moto } from '../types';

const API_URL = 'http://192.168.0.108:8080';


const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};


export async function getMotosFromAPI(): Promise<Moto[]> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/motos`, { headers });
    if (!response.ok) { throw new Error('Falha ao buscar motos da API.'); }
    return await response.json();
  } catch (error) {
    console.error('Erro em getMotosFromAPI:', error);
    return [];
  }
}

export async function saveMotoToAPI(newMoto: Omit<Moto, 'id'>): Promise<Moto | null> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/motos`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newMoto),
    });
    if (!response.ok) { throw new Error('Falha ao salvar a moto na API.'); }
    return await response.json();
  } catch (error) {
    console.error('Erro em saveMotoToAPI:', error);
    return null;
  }
}

export async function deleteMotoFromAPI(placa: string): Promise<boolean> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/motos/${placa}`, {
      method: 'DELETE',
      headers,
    });
    return response.ok;
  } catch (error) {
    console.error('Erro em deleteMotoFromAPI:', error);
    return false;
  }
}


export async function updateMotoAPI(placa: string, motoData: Partial<Moto>): Promise<Moto | null> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/motos/${placa}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(motoData),
    });

    if (!response.ok) {
      throw new Error('Falha ao atualizar a moto.');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro em updateMotoAPI:', error);
    return null;
  }
}