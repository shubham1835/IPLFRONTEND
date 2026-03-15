import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export var firebaseConfig = {
    apiKey: "AIzaSyBy3ucvIJ9qkkFNWUbRhKMnyIDCzMW6fOg",
    authDomain: "ipl-saatta.firebaseapp.com",
    projectId: "ipl-saatta",
    storageBucket: "ipl-saatta.appspot.com",
    messagingSenderId: "296381669945",
    appId: "1:296381669945:web:cdf7c091475140463fe3e8",
    measurementId: "G-MNY9MELM1K"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
