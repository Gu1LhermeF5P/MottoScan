const tintColorLight = '#00C247';
const tintColorDark = '#FFFFFF';

export default {
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
    background: '#282C34', // Tom de grafite mais claro, levemente azulado
    tint: tintColorDark,
    card: '#333842',     // Cards um pouco mais claros que o fundo
    border: '#4A4F58',   // Bordas visíveis, mas não muito brilhantes
    tabIconDefault: '#CCCCCC',
    tabIconSelected: tintColorDark,
  },
};