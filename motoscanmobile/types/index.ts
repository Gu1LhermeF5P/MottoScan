import { ImageSourcePropType } from 'react-native';
export type Zona = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type Status = 'BO' | 'MECANICO' | 'PRONTA';
export type Moto = {
  modelo: string;
  placa: string;
  imagem: ImageSourcePropType;
  zona: string;
  positionInZona?: { x: number; y: number };
  status: {
    multa: boolean;
    falhaMecanica: boolean;
    roubada: boolean;
  };
 
};

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

