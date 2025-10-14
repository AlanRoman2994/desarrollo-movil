// src/config/firebaseConfig.js
import { initializeApp, } from "firebase/app";
import { getAuth,initializeAuth, inMemoryPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚙️ Configuración de tu proyecto Firebase
const firebaseConfig = {
  //apiKey: "AIzaSyBd7xwz8nJT9kKTt9ONlrjqS2G1VYxNnCc",
  //authDomain: "tp-dm-95571.firebaseapp.com",
  //projectId: "tp-dm-95571",
  //storageBucket: "tp-dm-95571.appspot.com", // ✅ corregido
  //messagingSenderId: "690380462329",
  //appId: "1:690380462329:web:9e3c8529d4f88d2cfbaa28",
  //measurementId: "G-X5YPXE9C9C",
  apiKey: "AIzaSyCNyP61EC8PyFN9IDpCJyeZOSuppn1xVXk",
  authDomain: "lista-de-libros-f44e3.firebaseapp.com",
  projectId: "lista-de-libros-f44e3",
  storageBucket: "lista-de-libros-f44e3.firebasestorage.app",
  messagingSenderId: "751878950494",
  appId: "1:751878950494:web:fc09d701a474f9ef70eecf"

};

// 🔥 Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 🔑 Inicializar servicios de Firebase
const auth = initializeAuth(app, {
  persistence: inMemoryPersistence, 
});
const db = getFirestore(app);

// 📦 Exportar para usar en el resto de la app
export { auth, db };
