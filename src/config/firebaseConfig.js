// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚙️ Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBd7xwz8nJT9kKTt9ONlrjqS2G1VYxNnCc",
  authDomain: "tp-dm-95571.firebaseapp.com",
  projectId: "tp-dm-95571",
  storageBucket: "tp-dm-95571.appspot.com", // ✅ corregido
  messagingSenderId: "690380462329",
  appId: "1:690380462329:web:9e3c8529d4f88d2cfbaa28",
  measurementId: "G-X5YPXE9C9C",
};

// 🔥 Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 🔑 Inicializar servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// 📦 Exportar para usar en el resto de la app
export { auth, db };
