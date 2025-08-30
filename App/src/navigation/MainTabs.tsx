import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/private/Home';
import Fretes from '../screens/private/Fretes';
import Perfil from '../screens/private/Perfil';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home-outline';
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Fretes') {
            iconName = 'cube-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 10,
          height: 60,
          borderRadius: 15,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 5,
          paddingBottom: 0,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          padding: 5,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Fretes" component={Fretes} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}