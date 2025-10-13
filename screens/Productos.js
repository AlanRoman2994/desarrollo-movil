import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAllProducts, fetchLowStockCount, fetchUncheckedCount } from "../src/utils/models";

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
      <MaterialCommunityIcons name={iconName} size={24} color={COLORS.white} />
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
        <TouchableOpacity 
            style={[styles.addToOrderButton, { backgroundColor: pedidoButtonColor }]}
            onPress={() => onAddToOrder({ id, name, quantity })}
        >
            <Text style={styles.addToOrderText}>Pedidos</Text>
            <MaterialCommunityIcons name="plus-circle-outline" size={18} color={COLORS.white} />
        </TouchableOpacity>
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

  const handleSearch = (text) => console.log("Buscando:", text);
  const handleFilterPress = () => console.log("Botón de filtro presionado");
  const handlePress = (action) => console.log(`Acción presionada: ${action}`);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />
      <SafeAreaView style={{ backgroundColor: COLORS.headerPurple }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Producto</Text>
        <View style={styles.profileLetterContainer}>
          <Text style={styles.profileText}>{userProfileLetter}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 50) {
            fetchMoreProducts();
          }
        }}
        scrollEventThrottle={400}
      >
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
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <MaterialCommunityIcons name="filter-variant" size={24} color={COLORS.primaryPurple} />
          </TouchableOpacity>
        </View>

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

          <TouchableOpacity onPress={() => console.log("Ir a productos no revisados")}>
            <SummaryCard
              title="Artículos Recibidos"
              value={uncheckedCount.toString()}
              unit="En las últimas 24 horas"
              iconName="download-box"
              color={COLORS.primaryPurple}
            />
          </TouchableOpacity>
        </View>

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

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => handlePress("Agregar")}>
          <MaterialCommunityIcons name="plus-circle-outline" size={28} color={COLORS.primaryPurple} />
          <Text style={styles.navTextActive}>Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handlePress("Eliminar")}>
          <MaterialCommunityIcons name="minus-circle-outline" size={28} color={COLORS.gray} />
          <Text style={styles.navTextInactive}>Productos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Productos;

const styles = StyleSheet.create({
  mainContainer: {
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
    justifyContent: "space-between",
    marginVertical: 10,
  },
  summaryCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    zIndex: 10,
  },
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
});
