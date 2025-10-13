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
  errorRed: "#D32F2F",
};

const LowStockScreen = ({ navigation }) => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLowStockProducts = async () => {
      setLoading(true);
      try {
        const stored = await AsyncStorage.getItem("lowStockProducts");
        if (stored) {
          setLowStockProducts(JSON.parse(stored));
        } else {
          // Datos de prueba para scroll
          setLowStockProducts(
            Array.from({ length: 20 }, (_, i) => ({
              id: i,
              product_name: `Producto con bajo stock ${i + 1}`,
              brand: "Marca X",
              code: `C-00${i}`,
              list_price: 15.99,
              unit_price: 18.5,
              stock: 1,
              unchecked: 0,
            }))
          );
        }
      } catch (error) {
        console.error("Error al cargar productos de bajo stock:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLowStockProducts();
  }, []);

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
        <Text style={styles.headerTitle}>Stock Bajo</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* CONTENEDOR DEL SCROLL */}
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
            <Text style={styles.emptyMessage}>No hay productos con bajo stock.</Text>
          ) : (
            lowStockProducts.map((item) => (
              <View key={item.id} style={styles.inventoryItemContainer}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.product_name}</Text>
                  <Text style={styles.itemInfo}>Marca: {item.brand || "Sin marca"}</Text>
                  <Text style={styles.itemInfo}>Código: {item.code}</Text>
                  <Text style={styles.itemInfo}>
                    Precio lista: ${item.list_price?.toFixed(2)}
                  </Text>
                  <Text style={styles.itemInfo}>
                    Precio unidad: ${item.unit_price?.toFixed(2)}
                  </Text>
                  <Text style={[styles.itemInfo, { fontWeight: "bold", color: COLORS.errorRed }]}>
                    Stock: {item.stock}
                  </Text>
                  <Text style={styles.itemInfo}>
                    Revisado: {item.unchecked === 0 ? "Sí" : "No"}
                  </Text>
                </View>
                <View style={styles.itemStatusWrapper}>
                  <View
                    style={[styles.statusTag, { backgroundColor: COLORS.errorRed + "20" }]}
                  >
                    <Text style={[styles.statusText, { color: COLORS.errorRed }]}>Bajo stock</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LowStockScreen;

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
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600", color: COLORS.black, marginBottom: 4 },
  itemInfo: { fontSize: 14, color: COLORS.gray },
  itemStatusWrapper: { marginLeft: 10 },
  statusTag: { borderRadius: 5, paddingHorizontal: 8, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: "bold" },
});
