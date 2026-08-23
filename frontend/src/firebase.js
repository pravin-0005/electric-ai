import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRb_eZSnrHLx3WoeJDWD_iBdppkMMgksk",
  authDomain: "electric-ai-1f3a0.firebaseapp.com",
  projectId: "electric-ai-1f3a0",
  storageBucket: "electric-ai-1f3a0.firebasestorage.app",
  messagingSenderId: "815956393257",
  appId: "1:815956393257:web:afdcaeab6a05c53fe04b38"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);