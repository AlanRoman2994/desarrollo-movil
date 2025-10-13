import React, { useState } from "react";
import { 
  StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, 
  Platform, TextInput, Modal 
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = {
  headerPurple: "#7A5AAB",
  white: "#FFFFFF",
  gray: "#808080",
  black: "#000000",
  lightPurpleBorder: '#A06CDA',
};

const initialMissingProductsData = [
  { id: 'p1', name: 'A8CUARELA FILGO ESTUCHE 24 COLORES C/PINCEL', quantity: 5 },
  { id: 'p2', name: 'Paquetes de Cables Ethernet (CAT6)', quantity: 10 },
  { id: 'p3', name: 'Módulos GPS (Ublox M8N)', quantity: 35 },
  { id: 'p4', name: 'Baterías de Litio (18650)', quantity: 0 },
  { id: 'p5', name: 'Drones de Entrega (DJI Matrice)', quantity: 2 },
];

const MissingProductItem = ({ product, onDelete, onQuantityChange }) => (
  <View style={styles.missingProductItemContainer}>
    <View style={styles.missingProductTextContent}>
      <Text style={styles.missingProductName}>{product.name}</Text>
      <Text style={styles.missingProductInfo}>
        Cantidad: <Text style={{ fontWeight: 'bold' }}>{product.quantity}</Text>
      </Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput 
        style={styles.quantityInput} 
        value={String(product.quantity)} 
        keyboardType="numeric" 
        onChangeText={(text) => onQuantityChange(product.id, parseInt(text) || 0)} 
      />
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

const Pedidos = ({ navigation }) => {
  const [products, setProducts] = useState(initialMissingProductsData);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setProducts(prev => prev.map(product =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
  };

  const handleAddProduct = () => {
    if (!newProductName) return;
    const newProduct = {
      id: `p${products.length + 1}`,
      name: newProductName,
      quantity: parseInt(newProductQuantity) || 0,
    };
    setProducts(prev => [...prev, newProduct]);
    setNewProductName('');
    setNewProductQuantity('');
    setModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />
      <SafeAreaView style={{ backgroundColor: COLORS.headerPurple }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pedidos</Text>
        <View style={styles.userIconContainer}>
          <Text style={styles.userIconText}>A</Text>
        </View>
      </View>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={24} color={COLORS.gray} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar productos..." 
            placeholderTextColor={COLORS.gray} 
            value={searchText} 
            onChangeText={setSearchText} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.missingProductsCard}>
          <Text style={styles.missingProductsTitle}>Productos Faltantes</Text>
          {filteredProducts.map(product => (
            <MissingProductItem
              key={product.id}
              product={product}
              onDelete={() => handleDeleteProduct(product.id)}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </View>
      </ScrollView>

      <Modal 
        visible={modalVisible} 
        animationType="slide" 
        transparent={true} 
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Agregar Producto</Text>
            <TextInput 
              style={styles.modalInput} 
              placeholder="Nombre del producto" 
              value={newProductName} 
              onChangeText={setNewProductName} 
            />
            <TextInput 
              style={styles.modalInput} 
              placeholder="Cantidad" 
              keyboardType="numeric" 
              value={newProductQuantity} 
              onChangeText={setNewProductQuantity} 
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddProduct}>
                <Text style={styles.modalButtonText}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'gray' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="archive-plus" size={30} color={COLORS.headerPurple} />
          <Text style={styles.bottomBarText}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton}>
          <MaterialCommunityIcons name="archive-arrow-up" size={30} color={COLORS.headerPurple} />
          <Text style={styles.bottomBarText}>A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: COLORS.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingTop: Platform.OS === 'android' ? 10 : 0, backgroundColor: COLORS.headerPurple },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.white },
  userIconContainer: { backgroundColor: COLORS.white, width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  userIconText: { color: COLORS.headerPurple, fontWeight: 'bold', fontSize: 18 },
  searchBarContainer: { paddingHorizontal: 15, paddingBottom: 15, backgroundColor: COLORS.headerPurple },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 25, paddingHorizontal: 15, height: 50 },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.black },
  scrollContainer: { padding: 20, paddingBottom: 100 },
  missingProductsCard: { backgroundColor: COLORS.white, borderRadius: 12, padding: 15, borderWidth: 2, borderColor: COLORS.lightPurpleBorder, marginBottom: 20 },
  missingProductsTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.headerPurple, marginBottom: 10 },
  missingProductItemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  missingProductTextContent: { flex: 1, paddingRight: 15 },
  missingProductName: { fontSize: 14, fontWeight: '600', color: COLORS.black },
  missingProductInfo: { fontSize: 13, color: COLORS.gray, marginTop: 2 },
  quantityInput: { backgroundColor: COLORS.gray, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15, opacity: 0.8, color: COLORS.white, width: 60, textAlign: 'center', marginRight: 10 },
  deleteButton: { backgroundColor: 'red', padding: 8, borderRadius: 15 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingBottom: Platform.OS === 'ios' ? 30 : 10 },
  bottomBarButton: { alignItems: 'center', padding: 5 },
  bottomBarText: { fontSize: 12, color: COLORS.headerPurple },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '85%', backgroundColor: COLORS.white, borderRadius: 10, padding: 20 },
  
  
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.headerPurple, marginBottom: 15 },
  modalInput: { borderWidth: 1, borderColor: COLORS.gray, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalButton: { backgroundColor: COLORS.headerPurple, padding: 10, borderRadius: 8, flex: 1, alignItems: 'center', marginHorizontal: 5 },
  modalButtonText: { color: COLORS.white, fontWeight: 'bold' },
});

export default Pedidos;
