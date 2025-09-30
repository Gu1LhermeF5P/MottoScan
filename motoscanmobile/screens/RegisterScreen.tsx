import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const RegisterScreen = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { colors } = useTheme();
  const styles = getStyles(colors);

 
  const handleRegister = async () => {
   
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert("Erro de Cadastro", "Por favor, preencha todos os campos.");
      return;
    }
    
    setLoading(true);
    
    const success = await register(nome, email, senha);
    setLoading(false);

    
    if (success) {
      Alert.alert("Sucesso!", "Sua conta foi criada. Agora você pode fazer o login.");
      navigation.navigate('Login'); // Leva o usuário para a tela de login
    } else {
      Alert.alert("Falha no Cadastro", "Não foi possível criar a conta. Este email pode já estar em uso.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nome Completo" 
        placeholderTextColor={colors.border} 
        value={nome} 
        onChangeText={setNome} 
      />
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
        onPress={handleRegister} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={loading}>
        <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
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
      backgroundColor: colors.background 
    },
    title: { 
      fontSize: 28, 
      fontWeight: 'bold', 
      color: colors.tint, 
      marginBottom: 30 
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
      color: colors.text 
    },
    button: { 
      width: '100%', 
      height: 50, 
      backgroundColor: colors.tint, 
      borderRadius: 8, 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: 10 
    },
    buttonDisabled: { 
      opacity: 0.7 
    },
    buttonText: { 
      color: colors.background, 
      fontSize: 18, 
      fontWeight: 'bold' 
    },
    linkText: { 
      color: colors.tint, 
      marginTop: 20, 
      fontSize: 16 
    },
});

export default RegisterScreen;