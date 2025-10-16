import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { generatePDF } from "../src/utils/models";
const COLORS = {
  primaryPurple: "#7F40BF",
  blueButton: "#1A5B8E",
  greenButton: "#28A745",
  accentPurple: "#9B59B6",
  secondaryBlue: "#4A90E2",
  white: "#FFFFFF",
  gray: "#F5F5F5",
  black: "#000000",
};

const Documentos = ({ navigation }) => {

  const handleDownload = async (documentType) => {
  try {
    Alert.alert("Generando PDF...", `Creando ${documentType}...`);
    await generatePDF(documentType);
    Alert.alert("Éxito", `${documentType} generado y listo para compartir.`);
  } catch (error) {
    console.error("Error generando PDF:", error);
    Alert.alert("Error", "No se pudo generar el documento.");
  }
};


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryPurple} />
      <SafeAreaView style={{ backgroundColor: COLORS.primaryPurple }} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documentos</Text>
      </View>

      {/* BODY */}
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        {/* BOTÓN 1 */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.blueButton }]}
          onPress={() => handleDownload("Lista de Pedidos")}
        >
          <MaterialCommunityIcons
            name="file-download-outline"
            size={40}
            color={COLORS.white}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Lista de Pedidos</Text>
        </TouchableOpacity>

        {/* BOTÓN 2 */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.greenButton }]}
          onPress={() => handleDownload("Lista de Productos")}
        >
          <MaterialCommunityIcons
            name="file-table-outline"
            size={40}
            color={COLORS.white}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Lista de Productos</Text>
        </TouchableOpacity>

        {/* BOTÓN 3 */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.accentPurple }]}
          onPress={() => handleDownload("Reporte de Ventas (30 Días)")}
        >
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={40}
            color={COLORS.white}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Reporte de Ventas</Text>
        </TouchableOpacity>

        {/* BOTÓN 4 */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.secondaryBlue }]}
          onPress={() => handleDownload("Documento de Facturación")}
        >
          <MaterialCommunityIcons
            name="file-document-outline"
            size={40}
            color={COLORS.white}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Documento de Facturación</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Documentos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  header: {
  height: 60,
  backgroundColor: COLORS.primaryPurple,
  paddingHorizontal: 20,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 15,
  flexDirection: "row",
  alignItems: "center",
  position: "relative", // importante para el título absoluto
},

headerTitle: {
  position: "absolute",
  left: 0,
  right: 0,
  textAlign: "center",
  fontSize: 20,
  color: COLORS.white,
  fontWeight: "bold",
  zIndex:-1, // para asegurarse de que esté detrás del botón de retroceso
},

  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: COLORS.primaryPurple,
    fontWeight: "bold",
    fontSize: 18,
  },
  bodyContainer: {
    padding: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
