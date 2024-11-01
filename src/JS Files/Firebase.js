import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBH45S5jFLNT2J6w8ntxihWa5hHRbUD_Sw",
    authDomain: "my-first-project-4414e.firebaseapp.com",
    projectId: "my-first-project-4414e",
    storageBucket: "my-first-project-4414e.appspot.com",
    messagingSenderId: "338684673100",
    appId: "1:338684673100:web:e976092959e37eca6288e9",
    measurementId: "G-HY93KYSCR9"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);