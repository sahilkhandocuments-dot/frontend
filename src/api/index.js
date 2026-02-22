import axiosInstance from './axios';

// Auth endpoints
export const authAPI = {
  register: (userData) => axiosInstance.post('/auth/register', userData),
  login: (email, password) => axiosInstance.post('/auth/login', { email, password }),
  me: () => axiosInstance.get('/auth/me'),
  logout: () => axiosInstance.post('/auth/logout'),
};

// Events endpoints
export const eventsAPI = {
  getAll: () => axiosInstance.get('/events/'),
  getById: (id) => axiosInstance.get(`/events/${id}`),
  create: (eventData) => axiosInstance.post('/events/', eventData),
  update: (id, eventData) => axiosInstance.put(`/events/${id}`, eventData),
  delete: (id) => axiosInstance.delete(`/events/${id}`),
  register: (eventId) => axiosInstance.post(`/events/${eventId}/register`),
  getRegistrations: (eventId) => axiosInstance.get(`/events/${eventId}/registrations`),
};

// Admin endpoints
export const adminAPI = {
  // Users
  getUsers: (params) => axiosInstance.get('/admin/users', { params }),
  getUserDetails: (id) => axiosInstance.get(`/admin/users/${id}`),
  updateUser: (id, data) => axiosInstance.patch(`/admin/users/${id}`, data),
  deleteUser: (id) => axiosInstance.delete(`/admin/users/${id}`),
  
  // Events
  getEvents: (params) => axiosInstance.get('/admin/events', { params }),
  deleteEvent: (id) => axiosInstance.delete(`/admin/events/${id}`),
  updateEventStatus: (id, status) => axiosInstance.patch(`/admin/events/${id}/status`, null, { params: { status } }),
  
  // Stats & Analytics
  getStats: () => axiosInstance.get('/admin/stats'),
  getRecentActivity: (limit = 20) => axiosInstance.get('/admin/recent-activity', { params: { limit } }),
};

// Default export for convenience
export default axiosInstance;
