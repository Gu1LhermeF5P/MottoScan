import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native'; 

import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LocalizationProvider, useLocalization } from './context/LocalizationContext';

import type { RootStackParamList, TabParamList } from './types';


import HomeScreen from './screens/HomeScreen';
import RegisterMotoScreen from './screens/RegisterMotoScreen';
import MotoListScreen from './screens/MotoListScreen';
import PatioScreen from './screens/PatioScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EditMotoScreen from './screens/EditMotoScreen';
import MotoDetailsScreen from './screens/MotoDetailScreen';

// Use os tipos corretos ao criar os navegadores
const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppTabs() {
  const { colors } = useTheme();
  const { logout } = useAuth(); 
  const { i18n } = useLocalization();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { 
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text },

        headerRight: () => (
          <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
            <Ionicons name="log-out-outline" size={26} color={colors.text} />
          </TouchableOpacity>
        ),

        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'alert';
          if (route.name === 'Home') iconName = 'home-outline';
          
          else if (route.name === i18n.t('home.register_moto_button')) iconName = 'add-circle-outline';
          else if (route.name === i18n.t('home.view_motos_button')) iconName = 'bicycle-outline';
          else if (route.name === 'Pátio') iconName = 'map-outline'; 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
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

function AppStack() {
  const { colors } = useTheme();
  const { i18n } = useLocalization();

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AppTabs" 
        component={AppTabs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="EditMoto" 
        component={EditMotoScreen} 
        options={{ 
          headerShown: true, 
          title: i18n.t('editMoto.title'),
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text },
          headerTintColor: colors.tint,
        }} 
      />
      <Stack.Screen 
        name="MotoDetail" 
        component={MotoDetailsScreen} 
        options={{ 
          headerShown: true, 
          title: i18n.t('motoDetail.title'),
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text },
          headerTintColor: colors.tint,
        }} 
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { token, isLoading } = useAuth();
  const { isDarkMode, colors } = useTheme();

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      text: colors.text,
      primary: colors.tint,
      card: colors.card,
      border: colors.border,
    },
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}