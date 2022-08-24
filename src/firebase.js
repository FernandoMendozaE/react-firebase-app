// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDyEGuj9ujuJIa8L8f4Ej6Qybes-LrhiFo',
  authDomain: 'react-fb-auth-e9057.firebaseapp.com',
  projectId: 'react-fb-auth-e9057',
  storageBucket: 'react-fb-auth-e9057.appspot.com',
  messagingSenderId: '23854612379',
  appId: '1:23854612379:web:69f08b76c1c4c5ffeaeb3e'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
