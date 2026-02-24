import api from './axiosConfig';

export const login = (credentials) => api.post('/api/admin/login', credentials);