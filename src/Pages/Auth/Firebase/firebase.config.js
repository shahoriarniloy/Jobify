// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration from environment variables
const firebaseConfig = {

  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
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