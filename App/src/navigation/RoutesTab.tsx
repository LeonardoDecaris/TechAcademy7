import React from 'react';

import Home from '@/src/screens/private/Home';
import Profile from '@/src/screens/private/Profile';
import Freight from '@/src/screens/private/Freight';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <Ionicons name="home-outline" size={size} color={color} />;
            case 'Freight':
              return <MaterialCommunityIcons name="truck-outline" size={size} color={color} />;
            case 'Profile':
              return <Ionicons name="person-outline" size={size} color={color} />;
            default:
              return <Ionicons name="ellipse-outline" size={size} color={color} />;
          }
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderTopStartRadius: 20,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom
        },
        tabBarItemStyle: { padding: 5 },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Inicio',}} />
      <Tab.Screen name="Freight" component={Freight} options={{ tabBarLabel: 'Fretes' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default MainTabs;