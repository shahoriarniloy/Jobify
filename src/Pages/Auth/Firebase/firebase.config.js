// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration from environment variables
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
const auth = getAuth(app);
export default auth;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // Your web app's Firebase configuration from environment variables
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY || "default-api-key",
//   authDomain: import.meta.env.VITE_AUTHDOMAIN || "default-auth-domain",
//   projectId: import.meta.env.VITE_PROJECTID || "default-project-id",
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET || "default-storage-bucket",
//   messagingSenderId:
//     import.meta.env.VITE_MESSAGINGSENDERID || "default-messaging-sender-id",
//   appId: import.meta.env.VITE_APPID || "default-app-id",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export default auth;