import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAe4PU4bvAb7T_tO2lfJZvZX-NXf0tT6eY",
  authDomain: "quintillion-data.firebaseapp.com",
  projectId: "quintillion-data",
  storageBucket: "quintillion-data.firebasestorage.app",
  messagingSenderId: "92868132318",
  appId: "1:92868132318:web:a9b1df1ec3bc1b0fd2b14f",
};

const app = initializeApp(firebaseConfig);

// ✅ ONLY export auth from here
export const auth = getAuth(app);

export default app;
