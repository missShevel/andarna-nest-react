// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBd-Y5L92HFptzWoH3Ts0ceCBhGcy4Ct0M',
  authDomain: 'andarna-3049f.firebaseapp.com',
  projectId: 'andarna-3049f',
  storageBucket: 'andarna-3049f.appspot.com',
  messagingSenderId: '280639942075',
  appId: '1:280639942075:web:d6270080ef213b9a29a89e',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
