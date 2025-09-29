// navigation/navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MotoListScreen from '../screens/MotoListScreen';
import MotoDetailScreen from '../screens/MotoDetailScreen';
import RegisterMotoScreen from '../screens/RegisterMotoScreen';
import { RootStackParamList } from '../types';



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >  
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MotoList" component={MotoListScreen} />
        <Stack.Screen name="MotoDetail" component={MotoDetailScreen} />
        <Stack.Screen name="RegisterMoto" component={RegisterMotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
