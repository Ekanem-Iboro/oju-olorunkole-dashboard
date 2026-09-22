import axios from "axios";

// Base configuration
const baseConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};
// Create Public API instance (no token attached)
export const publicApi = axios.create(baseConfig);

// Create Private API instance (with token attachment)
export const privateApi = axios.create(baseConfig);

// Request Interceptor for PRIVATE API only
privateApi.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("access_token");

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No access token found for private API request");
    }

    return config;
  },
  (error) => {
    console.error("Private API Request Error:", error);
    return Promise.reject(error);
  },
);

// Request Interceptor for PUBLIC API (minimal logging)
publicApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Public API Request Error:", error);
    return Promise.reject(error);
  },
);

// Response Interceptor for PRIVATE API - handle 401
privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);
