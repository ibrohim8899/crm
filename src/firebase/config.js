import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCaoGZgvIJ5ZOJz2T-j13rih1SR_tjlDWo",
  authDomain: "crmds-cbd99.firebaseapp.com",
  projectId: "crmds-cbd99",
  storageBucket: "crmds-cbd99.firebasestorage.app",
  messagingSenderId: "448889675182",
  appId: "1:448889675182:web:8eec8808d76f0d27d73c3f",
  measurementId: "G-R6F9B1SFZQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);