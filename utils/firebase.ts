import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC8WbE9xdoMEYay6Nx8pkZPF7v1tmTds7g",
  authDomain: "netflix-clone-b146f.firebaseapp.com",
  projectId: "netflix-clone-b146f",
  storageBucket: "netflix-clone-b146f.appspot.com",
  messagingSenderId: "448714193364",
  appId: "1:448714193364:web:a3c9186285224f15b3be41"
};

const app =
  !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp

export const db = getFirestore()
export const auth = getAuth()
export default app
