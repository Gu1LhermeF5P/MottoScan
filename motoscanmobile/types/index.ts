import { ImageSourcePropType } from 'react-native';

export type Moto = {
  modelo: string;
  placa: string;
  imagem: ImageSourcePropType;
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
  Patio: undefined;
  RegisterMoto: undefined;
  MotoList: undefined;
  MotoDetail: { moto: Moto };
};

