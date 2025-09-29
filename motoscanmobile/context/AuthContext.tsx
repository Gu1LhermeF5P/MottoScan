import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = 'http://192.168.0.119:8080/auth';


interface AuthContextData {
  token: string | null;
  isLoading: boolean;

  login: (email: string, senha: string) => Promise<boolean>;
  register: (nome: string, email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);


interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadToken() {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setToken(storedToken);
      }
      setIsLoading(false);
    }
    loadToken();
  }, []);

  
  const login = async (email: string, senha: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        return false;
      }

      const receivedToken = await response.text();
      setToken(receivedToken);
      await AsyncStorage.setItem('userToken', receivedToken);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  
  const register = async (nome: string, email: string, senha: string) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });
      return response.ok;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    }
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}