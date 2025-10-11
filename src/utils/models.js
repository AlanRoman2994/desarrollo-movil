// traer productos

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // tu configuración de Firebase

async function getAllProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  console.log(products);
  return products;
}


//filtrado por mnarca 

import { collection, query, where, getDocs } from "firebase/firestore";

async function getAvailableSamsungProducts() {
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

import { addDoc, collection } from "firebase/firestore";

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

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

async function deleteProduct(productId) {
  const docRef = doc(db, "products", productId);
  await deleteDoc(docRef);
  console.log(`🗑️ Product with ID ${productId} deleted successfully.`);
}
