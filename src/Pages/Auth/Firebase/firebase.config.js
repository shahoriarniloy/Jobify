// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCg23oV6o7myvSLKmfxAobGghrOSd72itI",
    authDomain: "jobi-fy.firebaseapp.com",
    projectId: "jobi-fy",
    storageBucket: "jobi-fy.appspot.com",
    messagingSenderId: "663299811683",
    appId: "1:663299811683:web:0ba9e925bef54d48348b56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default auth;