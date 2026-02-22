import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

console.log('🔧 API Configuration:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  API_BASE_URL: API_BASE_URL
});

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Send cookies with requests
});

// CSRF token storage
let csrfToken = null;

// Function to get CSRF token
const getCSRFToken = async () => {
  if (!csrfToken) {
    try {
      const response = await axiosInstance.get('/auth/csrf-token');
      csrfToken = response.data.csrf_token;
    } catch (error) {
      console.warn('Failed to get CSRF token:', error);
    }
  }
  return csrfToken;
};

// Add CSRF protection to dangerous requests
axiosInstance.interceptors.request.use(
  async (config) => {
    // Cookies are automatically sent, no need for manual Authorization header
    
    // Add CSRF token for dangerous operations
    const dangerousMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    if (dangerousMethods.includes(config.method?.toUpperCase())) {
      const csrf = await getCSRFToken();
      if (csrf) {
        config.headers['X-CSRF-Token'] = csrf;
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses and errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear old localStorage data if any exists
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      csrfToken = null; // Clear CSRF token
      
      // Redirect to login - cookie will be cleared by server
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    if (error.response?.status === 403) {
      console.error('Access denied - insufficient permissions');
    }
    
    // Clear CSRF token on CSRF errors and retry
    if (error.response?.status === 400 && 
        error.response?.data?.detail?.includes('CSRF')) {
      csrfToken = null;
      console.warn('CSRF token invalid, will retry on next request');
    }
    
    return Promise.reject(error);
  }
);

export { getCSRFToken };
export default axiosInstance;
