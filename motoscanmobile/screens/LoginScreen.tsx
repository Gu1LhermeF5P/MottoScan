import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; 

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { colors } = useTheme(); 

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Erro de Login", "Por favor, preencha os campos de email e senha.");
      return;
    }

    setLoading(true);
    const success = await login(email, senha);
    setLoading(false);

    if (!success) {
      Alert.alert("Falha no Login", "O email ou a senha estão incorretos. Tente novamente.");
    }
  };

  
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MotoScan - Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.border} 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.border}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={loading}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};


const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.tint, 
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.border, 
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: colors.text, 
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.tint, 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.background, 
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: colors.tint, 
    marginTop: 20,
    fontSize: 16,
  },
});

export default LoginScreen;