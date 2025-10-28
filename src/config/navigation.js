import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SplashScreen from '../../screens/SplashScreen';
import LoginScreen from '../../screens/Login';
import SignUpScreen from '../../screens/SignUp';
import TabNavigator from '../../navigation/TabNavigator';
import LowStockScreen from '../../screens/LowStockScreen';
import Documentos from '../../screens/Documentos';
import Proveedores from '../../screens/Proveedores';
import Pedidos from '../../screens/Pedidos';
import Unchecked_Stock from '../../screens/Unchecked_Stock';
import PerfilScreen from "../../screens/PerfilScreen";
import Acercadenosotro from '../../screens/Acercadenosotro';
import Productos from '../../screens/Productos';
import Home from '../../screens/Home';
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              initialParams={{ userId: null }}
            />
            <Stack.Screen
              name="Productos"
              component={Productos}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="PerfilScreen" 
              component={PerfilScreen} 
              options={{ headerShown: false }}  
            />
            <Stack.Screen
              name="PerfilScreean"
              component={PerfilScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LowStockScreen"
              component={LowStockScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Acercadenosotro" component={Acercadenosotro} />
            <Stack.Screen name="Pedidos" component={Pedidos} />
            <Stack.Screen name="Proveedores" component={Proveedores} />
            <Stack.Screen name="Documentos" component={Documentos} />
            <Stack.Screen name="Unchecked_Stock" component={Unchecked_Stock} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default AppNavigator;