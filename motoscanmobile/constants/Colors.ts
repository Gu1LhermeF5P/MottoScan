// constants/Colors.ts

const tintColorLight = '#00C247';
const tintColorDark = '#FFFFFF';

// 1. Dê um nome ao seu objeto de cores (ex: "Colors")
const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: tintColorLight,
    card: '#F9F9F9',
    border: '#CCCCCC',
    tabIconDefault: '#CCCCCC',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF',
    background: '#282C34', // O tom de grafite mais claro
    tint: tintColorDark,
    card: '#333842',
    border: '#4A4F58',
    tabIconDefault: '#CCCCCC',
    tabIconSelected: tintColorDark,
  },
};

// 2. Exporte o objeto
export default Colors;

// 3. Exporte o tipo, que será usado em todas as telas
export type ColorPalette = typeof Colors.light;