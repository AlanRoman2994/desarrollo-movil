import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primaryPurple: "#5A3D8A",
  headerPurple: "#7A5AAB",
  white: "#FFFFFF",
  lightGray: "#DDDDDD",
  gray: "#808080",
  black: "#000000",
  statusGray: "#B0B0B0",
};

const Unchecked_Stock = ({ navigation }) => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLowStockProducts = async () => {
      setLoading(true);
      try {
        const stored = await AsyncStorage.getItem("uncheckedProducts");
        if (stored) {
          setLowStockProducts(JSON.parse(stored));
        } else {
          // Datos de prueba para scroll
          setLowStockProducts(
            Array.from({ length: 20 }, (_, i) => ({
              id: i,
              product_name: `Producto sin revisar ${i + 1}`,
              brand: "Marca X",
              code: `C-00${i}`,
              list_price: 15.99,
              unit_price: 18.5,
              stock: 1,
              unchecked: 1,
            }))
          );
        }
      } catch (error) {
        console.error("Error al cargar productos sin revisar:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLowStockProducts();
  }, []);

  // Marca un producto como revisado eliminándolo de la lista
  const markAsReviewed = (id) => {
    setLowStockProducts((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.headerPurple}
        translucent={false}
      />

      {/* HEADER FIJO */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sin Revisar</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* CONTENEDOR PRINCIPAL CON SCROLL */}
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={true}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primaryPurple}
              style={{ marginTop: 30 }}
            />
          ) : lowStockProducts.length === 0 ? (
            <Text style={styles.emptyMessage}>
              No hay productos sin revisar.
            </Text>
          ) : (
            lowStockProducts.map((item) => (
              <View key={item.id} style={styles.inventoryItemContainer}>
                {/* Información del producto */}
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.product_name}</Text>
                  <Text style={styles.itemInfo}>
                    Marca: {item.brand || "Sin marca"}
                  </Text>
                  <Text style={styles.itemInfo}>Código: {item.code}</Text>
                  <Text style={styles.itemInfo}>
                    Precio lista: ${item.list_price?.toFixed(2)}
                  </Text>
                  <Text style={styles.itemInfo}>
                    Precio unidad: ${item.unit_price?.toFixed(2)}
                  </Text>
                  <Text style={styles.itemInfo}>Stock: {item.stock}</Text>
                  <Text style={styles.itemInfo}>
                    Revisado: {item.unchecked === 0 ? "Sí" : "No"}
                  </Text>
                </View>

                {/* Etiqueta sin revisar + botón Revisado */}
                <View style={styles.itemStatusWrapper}>
                  <View
                    style={[styles.statusTag, { backgroundColor: COLORS.lightGray }]}
                  >
                    <Text
                      style={[styles.statusText, { color: COLORS.statusGray }]}
                    >
                      Sin revisar
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.reviewButton, { backgroundColor: COLORS.primaryPurple }]}
                    onPress={() => markAsReviewed(item.id)}
                  >
                    <Text style={styles.reviewButtonText}>Revisado</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Unchecked_Stock;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.headerPurple,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 15,
  },
  backButton: { width: 40 },
  headerTitle: { color: COLORS.white, fontSize: 20, fontWeight: "bold" },

  scrollContentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  emptyMessage: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 20,
  },

  inventoryItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600", color: COLORS.black, marginBottom: 4 },
  itemInfo: { fontSize: 14, color: COLORS.gray },

  itemStatusWrapper: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
  },

  statusTag: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
  },
  statusText: { fontSize: 12, fontWeight: "bold" },

  reviewButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  reviewButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
