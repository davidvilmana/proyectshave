import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABNLn9yB4HinqlwgX4jWWwy19RBa04dr4",
  authDomain: "shave-data.firebaseapp.com",
  projectId: "shave-data",
  storageBucket: "shave-data.firebasestorage.app",
  messagingSenderId: "570850986286",
  appId: "1:570850986286:web:7b1e147b48cdf1ad6792bf",
  measurementId: "G-WMFY31M19N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }