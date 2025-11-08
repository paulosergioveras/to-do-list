import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = () => api.get('/tasks/');
export const getTask = (id) => api.get(`/tasks/${id}/`);
export const createTask = (data) => api.post('/tasks/', data);
export const updateTask = (id, data) => api.put(`/tasks/${id}/`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}/`);

export default api;
