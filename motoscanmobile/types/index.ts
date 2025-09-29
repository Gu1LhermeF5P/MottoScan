// ESTRUTURA NOVA E CORRETA
export type Moto = {
  id: number; // Adicionado pela API
  modelo: string;
  placa: string;
  zona: string;
  
  // Campos de status "achatados"
  falhaMecanica: boolean;
  multa: boolean;
  roubada: boolean;
  
  // Campos de data adicionados pela API (opcionais na interface)
  createdAt?: string; 
  updatedAt?: string;
  
  // Campo de imagem adicionado localmente no app (opcional)
  imagem?: any; 
};