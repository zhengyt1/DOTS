// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRDl45ei6zGjhNygbB0E_hrxlxAQ0bPYc',
  authDomain: 'dots-38a1f.firebaseapp.com',
  projectId: 'dots-38a1f',
  storageBucket: 'dots-38a1f.appspot.com',
  messagingSenderId: '775634429853',
  appId: '1:775634429853:web:ef65a82c7855c51b18f174',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

export default firebaseStorage;
