import { Moto } from '../types'; // Mantenha sua tipagem

// 👇 COLOQUE O IP DA SUA MÁQUINA AQUI
// Lembre-se que o backend Java roda na porta 8080
const API_URL = 'http://192.168.0.119:8080';

export async function getMotosFromAPI(): Promise<Moto[]> {
  try {
    const response = await fetch(`${API_URL}/motos`);
    if (!response.ok) {
      throw new Error('Falha ao buscar motos da API.');
    }
    const motos: Moto[] = await response.json();
    return motos;
  } catch (error) {
    console.error('Erro em getMotosFromAPI:', error);
    return []; 
  }
}

/**
 * Salva uma nova moto na API.
 */
export async function saveMotoToAPI(newMoto: Omit<Moto, 'id'>): Promise<Moto | null> {

  try {
    const response = await fetch(`${API_URL}/motos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMoto),
    });

    if (!response.ok) {
      // Se a resposta for um conflito (placa duplicada), podemos tratar aqui
      if (response.status === 409) {
          console.error('Erro: Placa já cadastrada.');
          // Você pode querer lançar um erro específico para a UI capturar
          throw new Error('Placa já cadastrada.');
      }
      throw new Error('Falha ao salvar a moto na API.');
    }
    
    const createdMoto: Moto = await response.json();
    return createdMoto;
  } catch (error) {
    console.error('Erro em saveMotoToAPI:', error);
    return null; // Retorna nulo em caso de erro
  }
}

/**
 * Deleta uma moto da API usando a placa.
 */
export async function deleteMotoFromAPI(placa: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/motos/${placa}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Falha ao deletar a moto.');
    }
    
    return true; // Sucesso
  } catch (error) {
    console.error('Erro em deleteMotoFromAPI:', error);
    return false; // Falha
  }
}