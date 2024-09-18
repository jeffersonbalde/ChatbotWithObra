// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';    

const firebaseConfig = {
  apiKey: "AIzaSyAJEy1mT0tgg9WR2Ume9apvsoB6CE0A3Vo",
  authDomain: "mobilechatbot-43259.firebaseapp.com",
  projectId: "mobilechatbot-43259",
  storageBucket: "mobilechatbot-43259.appspot.com",
  messagingSenderId: "419268464588",
  appId: "1:419268464588:web:2be3fd60082ededea61769",
  measurementId: "G-8RVL1ESH99"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP); // Firestore instance
