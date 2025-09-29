import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Importe suas telas
import HomeScreen from './screens/HomeScreen';
import RegisterMotoScreen from './screens/RegisterMotoScreen';
import MotoListScreen from './screens/MotoListScreen';
import PatioScreen from './screens/PatioScreen';
import LoginScreen from './screens/LoginScreen'; // 👈 Importe
import RegisterScreen from './screens/RegisterScreen'; // 👈 Importe

// Vamos criar dois navegadores de pilha
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Pilha de navegação para quando o usuário está LOGADO
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'alert';
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Cadastrar Moto') iconName = 'add-circle-outline';
          else if (route.name === 'Motos') iconName = 'bicycle-outline';
          else if (route.name === 'Pátio') iconName = 'map-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00C247',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cadastrar Moto" component={RegisterMotoScreen} />
      <Tab.Screen name="Motos" component={MotoListScreen} />
      <Tab.Screen name="Pátio" component={PatioScreen} />
    </Tab.Navigator>
  );
}

// Pilha de navegação para quando o usuário NÃO está logado
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Componente principal que decide qual pilha mostrar
export default function App() {
  // Por enquanto, vamos deixar uma variável para simular o login
  // Na próxima etapa, isso virá de um "Contexto"
  const isAuthenticated = false; 

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}