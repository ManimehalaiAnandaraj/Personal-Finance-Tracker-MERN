// src/services/api.js
import axios from "axios";

// Use environment variable for backend URL
const API_URL = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or wherever you store your JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
