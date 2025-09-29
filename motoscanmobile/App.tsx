import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native'; 


import { AuthProvider, useAuth } from './context/AuthContext';


import HomeScreen from './screens/HomeScreen';
import RegisterMotoScreen from './screens/RegisterMotoScreen';
import MotoListScreen from './screens/MotoListScreen';
import PatioScreen from './screens/PatioScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


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


function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}


function AppNavigator() {
  const { token, isLoading } = useAuth();

 
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00C247" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}