import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyD6t93PZmNfV2SRMeq6JbCdwhz8PY8u5tY",
  authDomain: "foodie-center.firebaseapp.com",
  projectId: "foodie-center",
  storageBucket: "foodie-center.appspot.com", 
  messagingSenderId: "883685761376",
  appId: "1:883685761376:web:f6a62de5a7b22e0cdbfe05",
  measurementId: "G-3T2RLY0BL7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth }; 