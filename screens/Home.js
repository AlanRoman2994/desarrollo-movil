import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Asegúrate de tener esta dependencia

const COLORS = {
  primary: '#007AFF',
  secondary: '#FF9500',
  background: '#F2F2F2',
  text: '#333333',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
};

export default function Home({ navigation }) {
  const [userName, setUserName] = useState('Usuario');
  const [userProfileLetter, setUserProfileLetter] = useState('A');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí podrías cargar datos del usuario
    setTimeout(() => setLoading(false), 1000); // ejemplo de carga
  }, []);

  const menuItems = [
    { name: 'Inicio', icon: 'home' },
    { name: 'Perfil', icon: 'account' },
    { name: 'Ajustes', icon: 'cog' },
  ];

  const handleGridPress = (item) => {
    console.log('Presionaste:', item);
    // navegación u acción según item
  };

  const GridButton = ({ item, onPress }) => (
    <TouchableOpacity style={{ padding: 10, backgroundColor: COLORS.primary, margin: 5, borderRadius: 10 }} onPress={() => onPress(item.name)}>
      <Text style={{ color: COLORS.white }}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.page}>
        <Text style={{ color: COLORS.secondary, fontSize: 18 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      {/* HEADER PERSONALIZADO */}
      <View style={styles.header}>
        <Text style={{ color: COLORS.white, fontSize: 20 }}>Hola, {userName}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* BARRA DE BÚSQUEDA */}
        <View style={styles.searchBar}>
          <TextInput placeholder="Buscar..." style={{ backgroundColor: COLORS.gray, padding: 8, borderRadius: 10 }} />
        </View>

        {/* CUADRÍCULA DE BOTONES */}
        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <GridButton key={index} item={item} onPress={handleGridPress} />
          ))}
        </View>

        {/* BOTÓN PROVEEDORES */}
        <TouchableOpacity style={styles.largeGreenButton} onPress={() => handleGridPress('Proveedores')}>
          <Text style={styles.largeGreenButtonText}>Proveedores</Text>
          <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={COLORS.secondary} style={{marginLeft: 10}} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 390,
    height: 844,
    marginTop: 76,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    width: '100%',
  },
  header: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '100%',
  },
  searchBar: {
    marginVertical: 10,
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  largeGreenButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeGreenButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
