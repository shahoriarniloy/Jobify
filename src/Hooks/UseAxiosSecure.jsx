import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: 'https://jobify-server-steel.vercel.app',
  // baseURL: 'https://jobify-server-week2.vercel.app',
  // baseURL: 'https://jobify-servertry.vercel.app',
  // baseURL: 'https://jobify-server-zeta.vercel.app',
  baseURL: "https://jobify-server-ujo0.onrender.com",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default axiosSecure;
