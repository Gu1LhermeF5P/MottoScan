import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterMotoScreen';
import MotoListScreen from './screens/MotoListScreen';
import MotoDetailScreen from './screens/MotoDetailScreen';
import PatioScreen from './screens/PatioScreen';  


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home';

            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Cadastrar') iconName = 'add-circle';
            else if (route.name === 'Motos') iconName = 'bicycle';
            else if (route.name === 'Detalhes') iconName = 'information-circle';
            else if (route.name === 'Mapa') iconName = 'map'; 

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00C247', 
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cadastrar" component={RegisterScreen} />
        <Tab.Screen name="Motos" component={MotoListScreen} />
        <Tab.Screen name="Detalhes" component={MotoDetailScreen} />
        <Tab.Screen name="Mapa" component={PatioScreen} />    
      </Tab.Navigator>
    </NavigationContainer>
  );
}
