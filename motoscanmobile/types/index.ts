// types/index.ts

export type Moto = {
  id: number;
  modelo: string;
  placa: string;
  zona: string;
  falhaMecanica: boolean;
  multa: boolean;
  roubada: boolean;
  createdAt?: string;
  updatedAt?: string;
  imagem?: any;
};

// COLE O TIPO DA NAVEGAÇÃO AQUI 👇
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Detalhes: undefined;
  Cadastrar: undefined;
  Motos: undefined;
  Patio: { moto?: Moto };
  RegisterMoto: undefined;
  MotoList: undefined;
  MotoDetail: { moto: Moto };
};