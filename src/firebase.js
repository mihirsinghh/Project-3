// use firebase authentification for user login by email 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAQQEE561Iv9EosoqD2FJ5xGQsvz8a5_Mg",
    authDomain: "AUTH_domain",
    projectId: "favorite-books-bcaf1",
    storageBucket: "storageBucket",
    messagingSenderId: "messaging_sender_id",
    appId: "app_id",
};

// initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);