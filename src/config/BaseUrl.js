// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8001/api/",
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
