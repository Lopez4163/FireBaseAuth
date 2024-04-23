// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// firebaseConfig.js
const firebaseConfig = {
  apiKey: "AIzaSyBAVXLKD7OJXGxA3B1pnujxuDnnfDH8mfo",
  authDomain: "authtest-f7199.firebaseapp.com",
  projectId: "authtest-f7199",
  storageBucket: "authtest-f7199.appspot.com",
  messagingSenderId: "596678976219",
  appId: "1:596678976219:web:edc2046162b4d928b762fe",
  measurementId: "G-C6EBDSBYF0",
}
//providers
const provider = new GoogleAuthProvider()

// provider.setCustomParameters({
//   prompt: "select_account",
// })

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const signInWithGoogleRedirect = () => {
  signInWithRedirect(auth, provider)
}
