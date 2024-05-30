// export var firebaseConfig = {
//     apiKey: 'AIzaSyBoUdiDtzQdC-m4nj9CPY5SvY7uKJGL71k',
//     authDomain: 'matx-15ede.firebaseapp.com',
//     databaseURL: 'https://matx-15ede.firebaseio.com',
//     projectId: 'matx-15ede',
//     storageBucket: 'matx-15ede.appspot.com',
//     messagingSenderId: '348111707030',
//     appId: '1:348111707030:web:70c4ca4eb3f1dbd18e1bb7',
//     measurementId: 'G-806629YLNN',
// }

// export const auth0Config = {
//     client_id: 'XmminWIs0S8gR3gIRBydYLWbF58x81vK',
//     domain: 'matx.us.auth0.com',
// }

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export var firebaseConfig = {
    apiKey: "AIzaSyBy3ucvIJ9qkkFNWUbRhKMnyIDCzMW6fOg",
    authDomain: "ipl-saatta.firebaseapp.com",
    projectId: "ipl-saatta",
    storageBucket: "ipl-saatta.appspot.com",
    messagingSenderId: "296381669945",
    appId: "1:296381669945:web:cdf7c091475140463fe3e8",
    measurementId: "G-MNY9MELM1K"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);

export const SERVER_URI = 'https://merchant-middleware-1-0-6.onrender.com';
// export const SERVER_URI = 'http://127.0.0.1:8083';
