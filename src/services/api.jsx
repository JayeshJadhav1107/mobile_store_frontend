import axios from 'axios';

// Creating axios instance with base API URL
const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Add token to headers before each request
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  // console.log("token", token)
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
