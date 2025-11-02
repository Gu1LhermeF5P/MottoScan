import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  "Cadastrar Moto": undefined; 
  Motos: undefined;
  "Pátio": undefined;
};


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


export type RootStackParamList = {
  
  Login: undefined;
  Register: undefined;
  
  
  AppTabs: NavigatorScreenParams<TabParamList>;
  
  
  EditMoto: { moto: Moto };
  MotoDetail: { moto: Moto };
};