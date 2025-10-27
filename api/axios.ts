import axios from 'axios';

// Base configuration
const baseConfig = {
    baseURL: 'http://localhost:3000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
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
        const token = localStorage.getItem('access_token');

        // If token exists, add to headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('No access token found for private API request');
        }

        // Log request (remove in production)
        console.log('Making Private API Request:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
        });

        return config;
    },
    (error) => {
        console.error('Private API Request Error:', error);
        return Promise.reject(error);
    }
);

// Request Interceptor for PUBLIC API (minimal logging)
publicApi.interceptors.request.use(
    (config) => {
        // Log public request (remove in production)
        console.log('Making Public API Request:', {
            url: config.url,
            method: config.method,
        });

        return config;
    },
    (error) => {
        console.error('Public API Request Error:', error);
        return Promise.reject(error);
    }
);

// Common Response Interceptor (shared by both instances)
const responseInterceptor = {
    success: (response: any) => {
        // Log successful response (remove in production)
        console.log('API Response Success:', {
            url: response.config.url,
            status: response.status,
            data: response.data,
        });

        return response;
    },
    error: (error: any) => {
        // Log error response
        console.error('API Response Error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message,
        });

        // Handle specific error cases
        if (error.response?.status === 401) {
            // Unauthorized - redirect to login or refresh token
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }

        if (error.response?.status === 500) {
            // Server error
            console.error('Server Error:', error.response.data);
        }

        return Promise.reject(error);
    }
};
