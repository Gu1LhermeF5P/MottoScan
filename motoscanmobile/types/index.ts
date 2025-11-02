import { NavigatorScreenParams } from '@react-navigation/native';


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


export type TabParamList = {
  Home: undefined;
  RegisterMoto: undefined; 
  MotoList: undefined;     
  Patio: undefined;    
  About: undefined;    
};


export type RootStackParamList = {
  
  Login: undefined;
  Register: undefined;
  
 
  AppTabs: NavigatorScreenParams<TabParamList>;
  
  
  EditMoto: { moto: Moto };
  MotoDetail: { moto: Moto };
};