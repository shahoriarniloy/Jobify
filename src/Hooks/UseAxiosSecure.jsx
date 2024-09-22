import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://jobify-server-steel.vercel.app', 
  withCredentials: true, 
});

export default axiosSecure;
