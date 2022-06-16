
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyD0UzQBJ8oyBh-MAL76AX1naw1qt9GM-oo",
    authDomain: "react-delivery-36a47.firebaseapp.com",
    projectId: "react-delivery-36a47",
    storageBucket: "react-delivery-36a47.appspot.com",
    messagingSenderId: "362462088754",
    appId: "1:362462088754:web:1fff8f9c5bf4b697d0f62b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
export { auth, db, storage, googleProvider }