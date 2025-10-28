import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { generatePDF } from "../src/utils/models";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, documentStyle as styles } from "../src/config/styles";


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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftIcon}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documentos</Text>
        {/* Espacio vacío para balancear la flecha */}
        <View style={styles.rightSpace} />
      </View>

      {/* BODY */}
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        {[
          { name: "Lista de Pedidos", color: COLORS.blueButton, icon: "file-download-outline" },
          { name: "Lista de Productos", color: COLORS.greenButton, icon: "file-table-outline" },
          { name: "Reporte de Ventas (30 Días)", color: COLORS.accentPurple, icon: "clipboard-text-outline" },
          { name: "Documento de Facturación", color: COLORS.secondaryBlue, icon: "file-document-outline" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: item.color }]}
            onPress={() => handleDownload(item.name)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={40}
              color={COLORS.white}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};


export default Documentos;
