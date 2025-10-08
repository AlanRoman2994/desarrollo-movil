import React from 'react';
// El archivo se llama 'navigation', pero el componente dentro se llama 'AppNavigator'
// Debes importar el nombre del componente que exporta por defecto el archivo.
// Corregido:
import AppNavigator from './src/config/navigation'; 

export default function App() {
  return <AppNavigator />;
}
