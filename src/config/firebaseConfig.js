import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
apiKey: "AIzaSyAG-XBtYGrZ80vOqTSA3AfTSlmFlTwkS8Q",
  authDomain: "desarrollo-movil-b20c8.firebaseapp.com",
  projectId: "desarrollo-movil-b20c8",
  storageBucket: "desarrollo-movil-b20c8.firebasestorage.app",
  messagingSenderId: "764833829565",
  appId: "1:764833829565:web:281edecd48306f14cc9dd4",
  measurementId: "G-EP6GQBERPT"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

