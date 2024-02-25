import { 
   getApp, 
   getApps, 
   initializeApp
} from "firebase/app";

import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
   apiKey:              process.env.EXPO_PUBLIC_API_KEY,
   authDomain:          process.env.EXPO_PUBLIC_AUTH_DOMAIN,
   projectId:           process.env.EXPO_PUBLIC_PROJECT_ID,
   storageBucket:       process.env.EXPO_PUBLIC_STORAGE_BUCKET,
   messagingSenderId:   process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
   appId:               process.env.EXPO_PUBLIC_APP_ID
};

const FIREBASE_APP = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export {
   FIREBASE_DB,
   FIREBASE_STORAGE
};