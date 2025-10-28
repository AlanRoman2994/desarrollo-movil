import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import HomeStack from './HomeStack'; // Stack con Home + Productos

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#A7E3C2',
        tabBarInactiveTintColor: '#F5F5F5',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = 'home';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Pantalla Inicio sin barra inferior */}
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarStyle: { display: 'none' }, // 👈 oculta la barra inferior
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0B0B45',
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
});

export default TabNavigator;


