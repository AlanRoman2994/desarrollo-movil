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
  StatusBar,
  Modal,
  TextInput
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/config/firebaseConfig"; // Ajusta según tu configuración

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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [proveedor, setProveedor] = useState("Proveedor 1");

  useEffect(() => {
    const loadLowStockProducts = async () => {
      setLoading(true);
      try {
        const stored = await AsyncStorage.getItem("lowStockProducts");
        if (stored) {
          setLowStockProducts(JSON.parse(stored));
        } else {
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
              pedidoEnviado: false, // nuevo campo
            }))
          );
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLowStockProducts();
  }, []);

  const openOrderForm = (product) => {
    setSelectedProduct(product);
    setCantidad("");
    setProveedor("Proveedor 1");
    setModalVisible(true);
  };

  const submitOrder = async () => {
    if (!cantidad || Number(cantidad) <= 0) return;

    try {
      await addDoc(collection(db, "pedidos"), {
        marca: selectedProduct.brand,
        codigo: selectedProduct.code,
        cantidad: Number(cantidad),
        proveedor,
      });

      setModalVisible(false);

      // Marcar producto como pedido enviado
      setLowStockProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id ? { ...p, pedidoEnviado: true } : p
        )
      );
    } catch (error) {
      console.error("Error al crear pedido:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.headerPurple}
        translucent={false}
      />

      {/* HEADER */}
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

      {/* LISTADO */}
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
                  <Text style={styles.itemInfo}>Precio lista: ${item.list_price?.toFixed(2)}</Text>
                  <Text style={styles.itemInfo}>Precio unidad: ${item.unit_price?.toFixed(2)}</Text>
                  <Text style={[styles.itemInfo, { fontWeight: "bold", color: COLORS.errorRed }]}>Stock: {item.stock}</Text>
                  <Text style={styles.itemInfo}>Revisado: {item.unchecked === 0 ? "Sí" : "No"}</Text>
                </View>

                <View style={styles.itemStatusWrapper}>
                  <View style={[styles.statusTag, { backgroundColor: COLORS.errorRed + "20" }]}>
                    <Text style={[styles.statusText, { color: COLORS.errorRed }]}>Bajo stock</Text>
                  </View>

                  {item.pedidoEnviado ? (
                    <View style={[styles.statusTag, { backgroundColor: COLORS.gray + "20" }]}>
                      <Text style={[styles.statusText, { color: COLORS.gray }]}>Esperando stock</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[styles.addToOrderButton, { backgroundColor: COLORS.primaryPurple }]}
                      onPress={() => openOrderForm(item)}
                    >
                      <Text style={styles.addToOrderText}>Pedidos</Text>
                      <MaterialCommunityIcons name="plus-circle-outline" size={18} color={COLORS.white} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Crear Pedido</Text>

            <Text>Cantidad:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={cantidad}
              onChangeText={setCantidad}
            />

            <Text>Proveedor:</Text>
            <View style={styles.pickerContainer}>
              {["Proveedor 1","Proveedor 2","Proveedor 3","Proveedor 4"].map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.proveedorOption, proveedor === p && { backgroundColor: COLORS.primaryPurple }]}
                  onPress={() => setProveedor(p)}
                >
                  <Text style={{ color: proveedor === p ? COLORS.white : COLORS.black }}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: COLORS.gray }]} onPress={() => setModalVisible(false)}>
                <Text>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: COLORS.primaryPurple }]} onPress={submitOrder}>
                <Text style={{ color: COLORS.white }}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LowStockScreen;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.headerPurple, paddingHorizontal: 20, paddingVertical: 15, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 15 },
  backButton: { width: 40 },
  headerTitle: { color: COLORS.white, fontSize: 20, fontWeight: "bold" },
  scrollContentContainer: { padding: 20, paddingBottom: 60 },
  emptyMessage: { fontSize: 16, color: COLORS.gray, textAlign: "center", marginTop: 20 },
  inventoryItemContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600", color: COLORS.black, marginBottom: 4 },
  itemInfo: { fontSize: 14, color: COLORS.gray },
  itemStatusWrapper: { flexDirection: "column", alignItems: "flex-end", gap: 6 },
  statusTag: { borderRadius: 5, paddingHorizontal: 8, paddingVertical: 4, marginBottom: 6 },
  statusText: { fontSize: 12, fontWeight: "bold" },
  addToOrderButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primaryPurple, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12, marginTop: 6 },
  addToOrderText: { color: COLORS.white, fontSize: 14, fontWeight: "600", marginRight: 6 },
  modalBackground: { flex: 1, backgroundColor: "#00000088", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "80%", backgroundColor: COLORS.white, padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: COLORS.gray, borderRadius: 5, padding: 8, marginBottom: 10 },
  pickerContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10, gap: 6 },
  proveedorOption: { padding: 8, borderRadius: 5, borderWidth: 1, borderColor: COLORS.gray },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: { flex: 1, padding: 10, marginHorizontal: 5, borderRadius: 5, alignItems: "center" },
});
