
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: /** */,
    authDomain: /** */,
    projectId: /** */,
    storageBucket: /** */,
    messagingSenderId: /** */,
    appId: /** */
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