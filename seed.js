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
  unchecked: data.unchecked,  // <- usar el valor del objeto
});

  console.log(`✅ Producto '${data.product_name}' agregado correctamente!`);
}

async function seedProducts() {
  const products = [
    { product_name: "Cuaderno A4 100 hojas", brand: "Norma", list_price: 1450.50, unit_price: 1350.25, stock: 5, unchecked: 2 },
    { product_name: "Lápiz HB", brand: "Faber-Castell", list_price: 1250.00, unit_price: 1205.75, stock: 10, unchecked: 0 },
    { product_name: "Bolígrafo azul", brand: "Bic", list_price: 1300.90, unit_price: 1250.40, stock: 15, unchecked: 3 },
    { product_name: "Marcador permanente", brand: "Sharpie", list_price: 1500.75, unit_price: 1400.50, stock: 50, unchecked: 0 },
    { product_name: "Resaltador amarillo", brand: "Stabilo", list_price: 1350.25, unit_price: 1275.80, stock: 80, unchecked: 1 },
    { product_name: "Goma de borrar", brand: "Pelikan", list_price: 1220.50, unit_price: 1200.10, stock: 100, unchecked: 0 },
    { product_name: "Sacapuntas doble", brand: "Maped", list_price: 1285.75, unit_price: 1250.60, stock: 60, unchecked: 2 },
    { product_name: "Regla 30cm", brand: "Faber-Castell", list_price: 1210.30, unit_price: 1205.90, stock: 70, unchecked: 0 },
    { product_name: "Tijeras escolares", brand: "Maped", list_price: 1420.80, unit_price: 1350.25, stock: 45, unchecked: 4 },
    { product_name: "Pegamento en barra", brand: "UHU", list_price: 1305.50, unit_price: 1250.75, stock: 55, unchecked: 0 },
    { product_name: "Carpeta A4", brand: "Oxford", list_price: 1500.00, unit_price: 1400.50, stock: 65, unchecked: 1 },
    { product_name: "Hoja blanca A4", brand: "Norma", list_price: 1255.25, unit_price: 1205.10, stock: 90, unchecked: 0 },
    { product_name: "Cuaderno de dibujo", brand: "Canson", list_price: 1600.40, unit_price: 1500.25, stock: 35, unchecked: 2 },
    { product_name: "Set de lápices de colores", brand: "Prismacolor", list_price: 1800.90, unit_price: 1700.60, stock: 40, unchecked: 0 },
    { product_name: "Agenda escolar", brand: "Norma", list_price: 1550.25, unit_price: 1450.80, stock: 38, unchecked: 1 },
    { product_name: "Calculadora científica", brand: "Casio", list_price: 3200.75, unit_price: 3000.50, stock: 30, unchecked: 0 },
    { product_name: "Libro de literatura juvenil", brand: "SM", list_price: 2000.60, unit_price: 1900.40, stock: 32, unchecked: 3 },
    { product_name: "Cuaderno cuadriculado", brand: "Norma", list_price: 1400.30, unit_price: 1350.20, stock: 42, unchecked: 0 },
    { product_name: "Marcador de pizarra blanca", brand: "Pilot", list_price: 1305.50, unit_price: 1250.75, stock: 50, unchecked: 2 },
    { product_name: "Estuche escolar", brand: "Totto", list_price: 2100.90, unit_price: 2000.50, stock: 60, unchecked: 0 },
  ];

  for (const product of products) {
    await addProduct("products", product);
  }

  console.log("🎉 Seed completado: 20 productos de librería agregados con stocks y bultos sin revisar!");
}


seedProducts();
