import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXZW0Ka5-uW9Ko293tgSDI4lLuUMHkjh0",
  authDomain: "signal-clone-90c37.firebaseapp.com",
  projectId: "signal-clone-90c37",
  storageBucket: "signal-clone-90c37.appspot.com",
  messagingSenderId: "748538090495",
  appId: "1:748538090495:web:54a0bd64bbb4a8a4f10dca",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
