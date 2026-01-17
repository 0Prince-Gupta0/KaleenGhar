import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const apiKey= import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain=import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId= import.meta.env.VITE_FIREBASE_PROJECT_ID;

// console.log(apiKey);
// console.log(authDomain);
// console.log(projectId);

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
