export type Moto = {
  modelo: string;
  placa: string;
  imagem:string;
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
  RegisterMoto: undefined;
  MotoList: undefined;
  MotoDetail: { moto: Moto };
};
