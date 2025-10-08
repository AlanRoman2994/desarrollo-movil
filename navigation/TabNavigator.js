import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

// RUTA CORREGIDA: Desde 'navigation/' solo se necesita '../' para llegar a 'screens/'
import HomeScreen from '../screens/Home'; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#A7E3C2', // Color de ícono activo (Verde Claro)
        tabBarInactiveTintColor: '#F5F5F5', // Color de ícono inactivo (Gris muy claro)
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = 'home';
          } 
          // Agregar más lógica de iconos aquí si tienes más pestañas

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Inicio' }} 
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#0B0B45', // Azul Marino
        borderTopWidth: 0, 
        height: 60, 
        paddingBottom: 5,
        paddingTop: 5,
    },
});

export default TabNavigator;