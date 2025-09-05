import React from 'react';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '@/src/screens/private/Home';
import Profile from '@/src/screens/private/Profile';
import Freight from '@/src/screens/private/Freight';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 14, backgroundColor: '#FFFFFF' }}>
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
          tabBarItemStyle: { padding: 5 },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Inicio' }}/>
        <Tab.Screen name="Freight" component={Freight} options={{ tabBarLabel: 'Fretes' }} />
        <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Perfil' }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}