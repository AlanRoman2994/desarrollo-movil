import {  where,collection, getDocs, query, limit as limitFn, startAfter as startAfterFn, orderBy,startAt,endAt } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // tu configuración de Firebase
import AsyncStorage from "@react-native-async-storage/async-storage";


 async function getAllProducts(limitCount = 10, startAfterDoc = null) {
  try {
    let q;
    const productsRef = collection(db, "products");

    if (startAfterDoc) {
      q = query(
        productsRef,
        orderBy("product_name"), // ordenar por un campo consistente
        startAfterFn(startAfterDoc),
        limitFn(limitCount)
      );
    } else {
      q = query(
        productsRef,
        orderBy("product_name"),
        limitFn(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { products, lastVisible };
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return { products: [], lastVisible: null };
  }
}


//filtrado por mnarca 

async function getAvailableProducts() {
  const q = query(
    collection(db, "products"),
    where("brand", "==", "Samsung"),
    where("stock", ">", 0)
  );

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  console.log(products);
  return products;
}

//agregar producto 

async function addProduct() {
  await addDoc(collection(db, "products"), {
    product_name: "Wireless Mouse",
    brand: "Logitech",
    code: "LMX-450",
    list_price: 25.99,
    unit_price: 22.50,
    stock: 100,
    unchecked: false
  });

  console.log("✅ Product added successfully!");
}

async function getLowStockProducts(limitCount = 10, startAfterDoc = null) {
  try {
    const productsRef = collection(db, "products");
    let q = query(
      productsRef,
      where("stock", "<=", 5),
      orderBy("stock"), // ordenar para startAfter
      limit(limitCount)
    );

    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { products, lastDoc };
  } catch (error) {
    console.error("Error al obtener productos bajo stock:", error);
    return { products: [], lastDoc: null };
  }
}

 const fetchLowStockCount = async () => {
  try {
    const q = query(collection(db, "products"), where("stock", "<=", 10));
    const querySnapshot = await getDocs(q);

    // Obtenemos todos los productos
    const lowStockProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Guardamos en almacenamiento local
    await AsyncStorage.setItem(
      "lowStockProducts",
      JSON.stringify(lowStockProducts)
    );

    // Devolvemos la cantidad
    return lowStockProducts.length;
  } catch (error) {
    console.error("Error al obtener productos con bajo stock:", error);
    return 0;
  }
};

const fetchUncheckedCount = async () => {
  try {
    const q = query(collection(db, "products"), where("unchecked", ">", 0));
    const querySnapshot = await getDocs(q);

    const uncheckedProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Guardamos en AsyncStorage con su propia clave
    await AsyncStorage.setItem(
      "uncheckedProducts",
      JSON.stringify(uncheckedProducts)
    );

    // Retornamos la cantidad
    return uncheckedProducts.length;
  } catch (error) {
    console.error("Error al obtener productos no revisados:", error);
    return 0;
  }
};


async function searchRealTime(searchText) {
  if (!searchText || searchText.trim() === "") return [];

  const productsRef = collection(db, "products");
  const searchLower = searchText.toLowerCase();

  try {
    // Traer todos los productos
    const querySnapshot = await getDocs(productsRef);
    const allProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filtrar localmente en memoria por los campos indicados
    const filtered = allProducts.filter(item =>
      (item.product_name && item.product_name.toLowerCase().includes(searchLower)) ||
      (item.brand && item.brand.toLowerCase().includes(searchLower)) ||
      (item.code && item.code.toLowerCase().includes(searchLower))
    );

    return filtered;
  } catch (error) {
    console.error("Error en searchRealTime:", error);
    return [];
  }
}


export{
  getAllProducts,
  getAvailableProducts,
  addProduct,
  getLowStockProducts,
  fetchLowStockCount,
  fetchUncheckedCount,
  searchRealTime
}