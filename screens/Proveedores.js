import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = {
  primaryPurple: "#5A3D8A",
  headerPurple: "#7A5AAB",
  white: "#FFFFFF",
  lightGray: "#DDDDDD",
  gray: "#808080",
  black: "#000000",
  successGreen: "#2E7D32",
};

// Datos de ejemplo de proveedores
const proveedoresData = [
  { id: "1", nombre: "Distribuidora San Martín", contacto: "Juan Pérez", telefono: "11 2345-6789", estado: "Activo" },
  { id: "2", nombre: "ElectroCenter S.A.", contacto: "María López", telefono: "11 4567-8910", estado: "Activo" },
  { id: "3", nombre: "TecnoMundo", contacto: "Carlos Díaz", telefono: "11 9876-5432", estado: "Inactivo" },
  { id: "4", nombre: "Proveedora Andina", contacto: "Ana García", telefono: "11 2233-4455", estado: "Activo" },
];

const ProveedorCard = ({ proveedor }) => (
  <View style={styles.card}>
    <View style={{ flex: 1 }}>
      <Text style={styles.nombre}>{proveedor.nombre}</Text>
      <Text style={styles.detalle}>Contacto: {proveedor.contacto}</Text>
      <Text style={styles.detalle}>Tel: {proveedor.telefono}</Text>
    </View>
    <View
      style={[
        styles.estado,
        {
          backgroundColor:
            proveedor.estado === "Activo" ? COLORS.successGreen : COLORS.gray,
        },
      ]}
    >
      <Text style={styles.estadoTexto}>{proveedor.estado}</Text>
    </View>
  </View>
);

const Proveedores = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const filtered = proveedoresData.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />
      <SafeAreaView style={{ backgroundColor: COLORS.headerPurple }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Proveedores</Text>
        <View style={styles.profileLetterContainer}>
          <Text style={styles.profileText}>A</Text>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchBarRow}>
        <View style={styles.searchBarContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar proveedor..."
            placeholderTextColor={COLORS.gray}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="filter-variant" size={24} color={COLORS.primaryPurple} />
        </TouchableOpacity>
      </View>

      {/* Lista de proveedores */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.listCard}>
          <Text style={styles.listTitle}>Listado de Proveedores</Text>
          {filtered.map((p) => (
            <ProveedorCard key={p.id} proveedor={p} />
          ))}
          <TouchableOpacity style={styles.verMasButton}>
            <Text style={styles.verMasText}>Ver más...</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Botón flotante para agregar proveedor */}
      <TouchableOpacity style={styles.fabButton}>
        <MaterialCommunityIcons name="plus" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Proveedores;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.headerPurple,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 15,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  profileLetterContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: COLORS.primaryPurple,
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  listCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primaryPurple,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingVertical: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
  },
  detalle: {
    fontSize: 13,
    color: COLORS.gray,
  },
  estado: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  estadoTexto: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
  },
  verMasButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 10,
  },
  verMasText: {
    color: COLORS.gray,
    fontSize: 14,
    marginRight: 4,
  },
  fabButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primaryPurple,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
});
