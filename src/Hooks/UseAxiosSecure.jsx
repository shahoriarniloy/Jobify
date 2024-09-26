import axios from 'axios';

const axiosSecure = axios.create({
  // baseURL: 'https://jobify-server-steel.vercel.app', 
  baseURL: 'http://localhost:5000',
  withCredentials: true, 
});

export default axiosSecure;
