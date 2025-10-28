import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Platform,
  Modal,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAllProducts, fetchLowStockCount, fetchUncheckedCount, searchRealTime, deleteProduct } from "../src/utils/models"; // tu función CRUD
<<<<<<< HEAD
import { SafeAreaView } from "react-native-safe-area-context";
=======
import { SafeAreaView } from 'react-native-safe-area-context';
>>>>>>> c8e13ecad766124904c83df508ef9273d134ae9e
const COLORS = {
  primaryPurple: "#5A3D8A",
  headerPurple: "#7A5AAB",
  white: "#FFFFFF",
  lightGreen: "#C8E8C9",
  darkGreenText: "#388E3C",
  lightGray: "#DDDDDD",
  gray: "#808080",
  black: "#000000",
  warningOrange: "#FF9800",
  errorRed: "#D32F2F",
  successGreen: "#4CAF50",
  noStockBlack: "#000000",
  cardBackground: "#F5F5F5",
  pedidoButtonGreen: "#4CAF50",
  pedidoButtonGray: "#808080",
};

const SummaryCard = ({ title, value, unit, iconName, color }) => (
  <View style={styles.summaryCard}>
    <View style={[styles.summaryIconContainer, { backgroundColor: color }]}>
      <MaterialCommunityIcons name={iconName} size={40} color={COLORS.white} />
    </View>
    <View style={styles.summaryTextContainer}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryTitle}>{title}</Text>
      <Text style={styles.summaryUnit}>{unit}</Text>
    </View>
  </View>
);

const InventoryItem = ({ id, name, quantity, price, status, onAddToOrder }) => {
  let statusText = "";
  let statusColor = COLORS.white;
  let statusBackgroundColor = COLORS.lightGray;

  switch (status) {
    case "low_stock":
      statusText = "Bajo Stock";
      statusBackgroundColor = COLORS.errorRed;
      break;
    case "in_warehouse":
      statusText = "En Almacén";
      statusBackgroundColor = COLORS.successGreen;
      break;
    case "no_stock":
      statusText = "Sin Stock";
      statusBackgroundColor = COLORS.noStockBlack;
      break;
    default:
      statusText = "";
      statusColor = COLORS.gray;
      statusBackgroundColor = COLORS.lightGray;
      break;
  }

  const pedidoButtonColor = status === "in_warehouse"
    ? COLORS.pedidoButtonGreen
    : COLORS.pedidoButtonGray;

  return (
    <TouchableOpacity style={styles.inventoryItemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemInfo}>Cantidad: {quantity}</Text>
        {price && <Text style={styles.itemInfo}>Precio: {price}</Text>}
      </View>
      <View style={styles.itemStatusWrapper}>
        <View style={[styles.statusTag, { backgroundColor: statusBackgroundColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const Productos = ({ navigation }) => {
  const [userProfileLetter] = useState("A");
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [uncheckedCount, setUncheckedCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [code, setCode] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [stock, setStock] = useState("");
  const [unchecked, setUnchecked] = useState("");
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    brand: "",
    code: "",
    list_price: "",
    unit_price: "",
    stock: "",
    unchecked: "",
  });

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteSearchText, setDeleteSearchText] = useState("");
  const [deleteResults, setDeleteResults] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    const { products, lastVisible: lastDoc } = await getAllProducts();
    const formatted = products.map(item => {
      let status = "in_warehouse";
      if (item.stock === 0) status = "no_stock";
      else if (item.stock <= 10) status = "low_stock";

      return {
        id: item.id,
        name: item.product_name,
        quantity: item.stock,
        price: item.unit_price ? `$${item.unit_price}` : null,
        status,
      };
    });

    setInventoryData(formatted);
    setLastVisible(lastDoc);
    setLoading(false);
  };

  const handleAddProduct = async () => {
    try {
      await addDoc(collection(db, "products"), {
        product_name: productName,
        brand,
        code,
        list_price: parseFloat(listPrice),
        unit_price: parseFloat(unitPrice),
        stock: parseInt(stock),
        unchecked: parseInt(unchecked),
      });

      Alert.alert("✅ Producto agregado");
      setModalVisible(false);

      // Limpiar campos
      setProductName("");
      setBrand("");
      setCode("");
      setListPrice("");
      setUnitPrice("");
      setStock("");
      setUnchecked("");
    } catch (error) {
      console.error("Error agregando producto:", error);
    }
  };


  const fetchMoreProducts = async () => {
    if (!lastVisible || fetchingMore) return;
    setFetchingMore(true);

    const { products, lastVisible: lastDoc } = await getAllProducts(10, lastVisible);
    const formatted = products.map(item => {
      let status = "in_warehouse";
      if (item.stock === 0) status = "no_stock";
      else if (item.stock <= 10) status = "low_stock";

      return {
        id: item.id,
        name: item.product_name,
        quantity: item.stock,
        price: item.unit_price ? `$${item.unit_price}` : null,
        status,
      };
    });

    setInventoryData(prev => [...prev, ...formatted]);
    setLastVisible(lastDoc);
    setFetchingMore(false);
  };

  useEffect(() => {
    fetchProducts();
    const fetchSummaryCounts = async () => {
      try {
        const stock = await fetchLowStockCount();
        const check = await fetchUncheckedCount();
        setLowStockCount(stock);
        setUncheckedCount(check);
      } catch (err) {
        console.error("Error al obtener counts:", err);
      }
    };
    fetchSummaryCounts();
  }, []);

  const handleAddToOrder = (product) => {
    console.log(`Producto añadido al pedido: ${product.name} (ID: ${product.id})`);
    alert(`"${product.name}" ha sido añadido al pedido. (Simulación)`);
  };

  const handleSearch = async (text) => {
    setSearchText(text); // guardamos el texto
    setInventoryData([]); // limpiamos resultados anteriores

    if (!text || text.trim() === "") {
      fetchProducts(); // recarga todos si el texto está vacío
      return;
    }

    const results = await searchRealTime(text);

    const formatted = results.map(item => {
      let status = "in_warehouse";
      if (item.stock === 0) status = "no_stock";
      else if (item.stock <= 10) status = "low_stock";

      return {
        id: item.id,
        name: item.product_name,
        quantity: item.stock,
        price: item.unit_price ? `$${item.unit_price}` : null,
        status,
      };
    });

    setInventoryData(formatted);
  };

  const searchProductToDelete = async (text) => {
    setDeleteSearchText(text);
    if (text.trim() === "") {
      setDeleteResults([]);
      return;
    }

    try {
      const results = await searchRealTime(text);
      setDeleteResults(results);
    } catch (error) {
      console.error("Error buscando productos:", error);
    }
  };
  const handleDeleteProduct = (productId) => {
  Alert.alert(
    "Confirmar eliminación",
    "¿Deseas eliminar este producto?",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            if (!productId) return; // seguridad por si no hay producto
            await deleteProduct(productId);

            // Limpiamos input y resultados
            setDeleteSearchText("");
            setDeleteResults([]);

            // Recargamos productos
            fetchProducts();

            Alert.alert("✅ Producto eliminado");
          } catch (error) {
            console.error("Error eliminando producto:", error);
            Alert.alert("Error", "No se pudo eliminar el producto");
          }
        },
      },
    ]
  );
};



  const handlePress = (action) => console.log(`Acción presionada: ${action}`);

  return (
<<<<<<< HEAD
    <SafeAreaView style={{ backgroundColor: COLORS.headerPurple, flex: 1}}>

    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />
    
=======
    <SafeAreaView style={{ backgroundColor: COLORS.headerPurple,flex:1 }}>
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />
>>>>>>> c8e13ecad766124904c83df508ef9273d134ae9e

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Producto</Text>
      </View>

      {/* SCROLL PRINCIPAL */}
      <ScrollView
         style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 50) {
            if (searchText === "") fetchMoreProducts(); // paginar si no hay búsqueda
          }
        }}
        scrollEventThrottle={400}
      >
        {/* BARRA DE BUSQUEDA */}
        <View style={styles.searchBarRow}>
          <View style={styles.searchBarContainer}>
            <MaterialCommunityIcons name="magnify" size={20} color={COLORS.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar productos..."
              placeholderTextColor={COLORS.gray}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {/* SUMMARY CARDS */}
        <View style={styles.summaryCardsRow}>
          <TouchableOpacity onPress={() => navigation.navigate("LowStockScreen")}>
            <SummaryCard
              title="Stock Bajo"
              value={lowStockCount.toString()}
              unit="Artículos que requieren atención"
              iconName="package-variant-alert"
              color={COLORS.errorRed}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Unchecked_Stock")}>
            <SummaryCard
              title="Artículos Recibidos"
              value={uncheckedCount.toString()}
              unit="En las últimas 24 horas"
              iconName="download-box"
              color={COLORS.primaryPurple}
            />
          </TouchableOpacity>
        </View>

        {/* INVENTARIO */}
        <View style={styles.inventoryListCard}>
          <Text style={styles.inventoryListTitle}>Artículos en Inventario</Text>
          {loading ? <Text>Cargando productos...</Text> :
            inventoryData.map(item => (
              <InventoryItem
                key={item.id}
                id={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                status={item.status}
                onAddToOrder={handleAddToOrder}
              />
            ))
          }
          {fetchingMore && <Text>Cargando más productos...</Text>}
        </View>
      </ScrollView>

      {/* BOTONES INFERIORES */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="plus-circle-outline" size={28} color={COLORS.primaryPurple} />
          <Text style={styles.navTextActive}>Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setDeleteModalVisible(true)}>
          <MaterialCommunityIcons name="minus-circle-outline" size={28} color={COLORS.gray} />
          <Text style={styles.navTextInactive}>Productos</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL AGREGAR PRODUCTO */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Agregar Producto</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Nombre del producto"
                value={newProduct.product_name}
                onChangeText={text => setNewProduct({ ...newProduct, product_name: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Marca"
                value={newProduct.brand}
                onChangeText={text => setNewProduct({ ...newProduct, brand: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Código"
                value={newProduct.code}
                onChangeText={text => setNewProduct({ ...newProduct, code: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Precio lista"
                keyboardType="numeric"
                value={newProduct.list_price.toString()}
                onChangeText={text => setNewProduct({ ...newProduct, list_price: parseFloat(text) })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Precio unidad"
                keyboardType="numeric"
                value={newProduct.unit_price.toString()}
                onChangeText={text => setNewProduct({ ...newProduct, unit_price: parseFloat(text) })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Stock"
                keyboardType="numeric"
                value={newProduct.stock.toString()}
                onChangeText={text => setNewProduct({ ...newProduct, stock: parseInt(text) })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Unchecked"
                keyboardType="numeric"
                value={newProduct.unchecked.toString()}
                onChangeText={text => setNewProduct({ ...newProduct, unchecked: parseInt(text) })}
              />

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity style={styles.modalButton} onPress={handleAddProduct}>
                  <Text style={styles.modalButtonText}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: COLORS.gray }]} onPress={() => setModalVisible(false)}>
                  <Text style={[styles.modalButtonText, { color: "#333" }]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* MODAL ELIMINAR PRODUCTO */}
      <Modal visible={deleteModalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000099" }}
        >
          <View style={{ width: "90%", backgroundColor: "#fff", padding: 20, borderRadius: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Eliminar Producto</Text>

            <TextInput
              placeholder="Introduce producto (brand, code, name)"
              value={deleteSearchText}
              onChangeText={searchProductToDelete}
              style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 15, padding: 8 }}
            />

            <ScrollView style={{ maxHeight: 250, marginBottom: 15 }}>
              {deleteResults.length > 0 ? (
                deleteResults.map(item => (
                  <View key={item.id} style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 5 }}>
                    <Text>{item.product_name} - {item.brand} - {item.code}</Text>
                    <TouchableOpacity
                      style={{ backgroundColor: "#D32F2F", padding: 8, borderRadius: 6, marginTop: 5 }}
                      onPress={() => handleDeleteProduct(item.id)}
                    >
                      <Text style={{ color: "#fff", textAlign: "center" }}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : deleteSearchText.trim() !== "" ? (
                <Text>No se encontraron productos</Text>
              ) : null}
            </ScrollView>

            <TouchableOpacity
              style={{ backgroundColor: "#999", padding: 10, borderRadius: 8 }}
               onPress={() => {
                              setDeleteModalVisible(false);   // cerrar modal
                              setDeleteSearchText("");        // limpiar input
                              setDeleteResults([]);           // limpiar resultados filtrados
  }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
    </SafeAreaView>
<<<<<<< HEAD

=======
>>>>>>> c8e13ecad766124904c83df508ef9273d134ae9e
  );
}

export default Productos;

const styles = StyleSheet.create({
  mainContainer: {
<<<<<<< HEAD
    backgroundColor: COLORS.white,
  },
  header: {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: COLORS.headerPurple,
  paddingHorizontal: 20,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10: 20,
},

backButton: {
  position: "absolute",
  left: 20,
  top: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 20,
},
=======
    flex:1,
    backgroundColor: COLORS.white,
  },

header: {
  height: 60, 
  flexDirection: "row", 
  alignItems: "center", // centra verticalmente todos los hijos
  justifyContent: "space-between", // separa los elementos a los extremos
  paddingHorizontal: 20,
  backgroundColor: COLORS.headerPurple,
},

>>>>>>> c8e13ecad766124904c83df508ef9273d134ae9e


headerTitle: {
  flex: 1,
  color: COLORS.white,
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
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
  summaryCardsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly", // <-- reparte el espacio de forma equitativa
    alignItems: "center",            // <-- centra verticalmente
    marginVertical: 10,
    gap: 15,                         // separa un poco sin deformar
  },

  summaryCard: {
    flex: 1,
    aspectRatio: 1.1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryIconContainer: {
    width: 50,                // tamaño del círculo o fondo
    height: 40,
    justifyContent: "center", // centra el ícono
    alignItems: "center",
    marginBottom: 10,         // separa el ícono del texto
  },

  summaryValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.black,
  },
  summaryTitle: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: "600",
  },
  summaryUnit: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  inventoryListCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inventoryListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    paddingVertical: 10,
    marginBottom: 5,
  },
  inventoryItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 4,
  },
  itemInfo: {
    fontSize: 14,
    color: COLORS.gray,
  },
  itemStatusWrapper: {
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  statusTag: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  addToOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  addToOrderText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 5,
  },
  bottomNav: {
<<<<<<< HEAD
    flexDirection: "row",
    justifyContent: "space-around", // mantiene los botones distribuidos horizontalmente
    alignItems: "flex-start", // alinea los botones arriba dentro de la barra
    height: 10,// aumenta la altura de la barra
    paddingHorizontal: 20,
    paddingTop: 10, // espacio desde arriba de la barra
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
=======
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 10,
  backgroundColor: COLORS.white,
  borderTopWidth: 1,
  borderTopColor: COLORS.lightGray,
},

>>>>>>> c8e13ecad766124904c83df508ef9273d134ae9e
  navItem: {
    alignItems: "center",
  },
  navTextActive: {
    color: COLORS.primaryPurple,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  navTextInactive: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#5A3D8A",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
