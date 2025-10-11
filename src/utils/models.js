import * as firestore from "firebase/firestore";
import { db } from "./src/config/firebaseConfig.js"; 

async function addProduct(collectionName, data) {
  await firestore.addDoc(firestore.collection(db, collectionName), {
    product_name: data.product_name,
    brand: data.brand,
    code: String(Math.floor(100000 + Math.random() * 900000)),
    list_price: data.list_price,
    unit_price: data.unit_price,
    stock: data.stock,
    unchecked: false,
  });

  console.log(`✅ Producto '${data.product_name}' agregado correctamente!`);
}

async function seedProducts() {
  const products = [
    { product_name: "Cuaderno A4 100 hojas", brand: "Norma", list_price: 5.5, unit_price: 4.5, stock: 150 },
    { product_name: "Lápiz HB", brand: "Faber-Castell", list_price: 0.5, unit_price: 0.4, stock: 500 },
    { product_name: "Bolígrafo azul", brand: "Bic", list_price: 1.0, unit_price: 0.8, stock: 400 },
    { product_name: "Marcador permanente", brand: "Sharpie", list_price: 2.5, unit_price: 2.0, stock: 120 },
    { product_name: "Resaltador amarillo", brand: "Stabilo", list_price: 1.5, unit_price: 1.2, stock: 200 },
    { product_name: "Goma de borrar", brand: "Pelikan", list_price: 0.8, unit_price: 0.6, stock: 300 },
    { product_name: "Sacapuntas doble", brand: "Maped", list_price: 1.2, unit_price: 1.0, stock: 250 },
    { product_name: "Regla 30cm", brand: "Faber-Castell", list_price: 1.0, unit_price: 0.9, stock: 200 },
    { product_name: "Tijeras escolares", brand: "Maped", list_price: 2.0, unit_price: 1.7, stock: 150 },
    { product_name: "Pegamento en barra", brand: "UHU", list_price: 1.5, unit_price: 1.2, stock: 220 },
    { product_name: "Carpeta A4", brand: "Oxford", list_price: 3.0, unit_price: 2.5, stock: 180 },
    { product_name: "Hoja blanca A4", brand: "Norma", list_price: 0.1, unit_price: 0.08, stock: 1000 },
    { product_name: "Cuaderno de dibujo", brand: "Canson", list_price: 6.0, unit_price: 5.0, stock: 120 },
    { product_name: "Set de lápices de colores", brand: "Prismacolor", list_price: 15.0, unit_price: 12.0, stock: 80 },
    { product_name: "Agenda escolar", brand: "Norma", list_price: 8.0, unit_price: 6.5, stock: 100 },
    { product_name: "Calculadora científica", brand: "Casio", list_price: 20.0, unit_price: 17.0, stock: 60 },
    { product_name: "Libro de literatura juvenil", brand: "SM", list_price: 12.0, unit_price: 10.0, stock: 70 },
    { product_name: "Cuaderno cuadriculado", brand: "Norma", list_price: 5.0, unit_price: 4.2, stock: 140 },
    { product_name: "Marcador de pizarra blanca", brand: "Pilot", list_price: 2.0, unit_price: 1.7, stock: 90 },
    { product_name: "Estuche escolar", brand: "Totto", list_price: 7.0, unit_price: 6.0, stock: 100 },
  ];

  for (const product of products) {
    await addProduct("products", product);
  }

  console.log("🎉 Seed completado: 20 productos de librería agregados!");
}

seedProducts();
