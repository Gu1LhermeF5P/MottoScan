
export type Moto = {
  modelo: string;
  placa: string;
  zona: string;
  positionInZona?: { x: number; y: number };
  status: {
    multa: boolean;
    falhaMecanica: boolean;
    roubada: boolean;
  };
  imagem:undefined;
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

