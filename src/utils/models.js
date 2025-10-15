import {  where,collection, getDocs, query, limit as limitFn, startAfter as startAfterFn, orderBy,startAt,endAt,doc,deleteDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // tu configuración de Firebase
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import { Alert } from "react-native";
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

 const deleteProduct = async (productId) => {
  if (!productId) throw new Error("Debe proporcionarse un productId");

  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    console.log(`✅ Producto ${productId} eliminado correctamente`);
  } catch (error) {
    console.error("Error eliminando producto:", error);
    throw error;
  }
};




const generatePDF = async (type) => {
  try {
    let data = [];
    let title = "";

    // 🔹 1. Obtener datos desde Firebase
    if (type === "Lista de Productos") {
      title = "Lista de Productos";
      const snapshot = await getDocs(collection(db, "products"));
      data = snapshot.docs.map((doc) => ({
        name: doc.data().product_name || "Sin nombre",
        stock: doc.data().stock ?? 0,
        price: doc.data().unit_price ?? 0,
        brand: doc.data().brand || "",
        code: doc.data().code || "",
        unchecked: doc.data().unchecked ?? false,
      }));
    } else if (type === "Lista de Pedidos") {
      title = "Lista de Pedidos";
      const snapshot = await getDocs(collection(db, "orders"));

      // Suponiendo que cada pedido tiene un array "items" con productos
      data = snapshot.docs.flatMap((doc) =>
        (doc.data().items || []).map((item) => ({
          name: item.product_name || "Sin nombre",
          stock: item.quantity ?? 0,
          price: item.unit_price ?? 0,
          brand: item.brand || "",
          code: item.code || "",
          unchecked: item.unchecked ?? false,
        }))
      );
    }

    // 🔹 2. Generar HTML dinámico con nuevas columnas
    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h1 { text-align: center; color: #5A3D8A; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <table>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Familia</th>
              <th>Code</th>
              <th>Sin revisar</th>
            </tr>
            ${data
              .map(
                (item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.stock}</td>
                <td>$${item.price}</td>
                <td>${item.brand}</td>
                <td>${item.code}</td>
                <td>${item.unchecked}</td>
              </tr>`
              )
              .join("")}
          </table>
        </body>
      </html>
    `;

    // 🔹 3. Generar PDF temporal
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    // 🔹 4. Guardar PDF permanentemente usando "base64"
    const newPath = FileSystem.documentDirectory + `${title}.pdf`;
    const fileData = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
    await FileSystem.writeAsStringAsync(newPath, fileData, { encoding: "base64" });

    // Borrar archivo temporal
    await FileSystem.deleteAsync(uri);

    // 🔹 5. Compartir PDF si es posible
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(newPath);
    }

    console.log("✅ PDF generado en:", newPath);
    return newPath;
  } catch (error) {
    console.error("❌ Error generando PDF:", error);
    throw error;
  }
};
export{
  getAllProducts,
  getAvailableProducts,
  addProduct,
  getLowStockProducts,
  fetchLowStockCount,
  fetchUncheckedCount,
  searchRealTime,
  deleteProduct,
  generatePDF
}