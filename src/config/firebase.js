// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCBB3zsjcVrAlC_JzsSMueLeuVt906qsyE',
  authDomain: 'expense-tracker-sharpnear.firebaseapp.com',
  projectId: 'expense-tracker-sharpnear',
  storageBucket: 'expense-tracker-sharpnear.appspot.com',
  messagingSenderId: '145777903795',
  appId: '1:145777903795:web:6a57882b17e0151b79c8c6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
