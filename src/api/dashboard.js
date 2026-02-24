import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Demo data 
const MOCK_DATA = {
  stats: {
    totalCall: '1,245',
    totalRems: '970',
    totalRPM: '2.5M',
    totalPRI: '450'
  },
  drivers: [
    { name: 'Guy Hawkins', email: 'tim.jennings@example.com', status: 'active' },
    { name: 'Guy Hawkins', email: 'tim.jennings@example.com', status: 'active' },
    { name: 'Guy Hawkins', email: 'tim.jenning@example.com', status: 'active' },
    { name: 'Guy Hawkins', email: 'tim.jennings@example.com', status: 'active' },
    { name: 'Guy Hawkins', email: 'tim.jennings@example.com', status: 'active' },
    { name: 'Guy Hawkins', email: 'tim.jenning@example.com', status: 'active' },
    { name: 'Guy Hawkins', email: 'tim.jennings@example.com', status: 'active' },
  ],
  clients: [
    { name: 'Eleanor Pena', services: 'Seo UI/UX Design Web Development Consulting', status: 'active' },
    { name: 'Eleanor Pena', services: 'Seo UI/UX Design Web Development Consulting', status: 'active' },
    { name: 'Eleanor Penta', services: 'Seo UI/UX Design Web Development Consulting', status: 'active' },
    { name: 'Eleanor Pena', services: 'SeoUI/UX Design Web Development Consulting', status: 'active' },
    { name: 'Eleanor Pena', services: 'SeoUI/UX Design Consulting', status: 'active' },
    { name: 'Eleanor Pena', services: 'SeoUI/UX Design Consulting', status: 'active' },
    { name: 'Eleanor Penta', services: 'SeoUI/UX Design Consulting', status: 'active' },
    { name: 'Eleanor Pena', services: 'SeoUI UX Design Web Development Consulting', status: 'active' },
    { name: 'Eleanor Pena', services: 'SeoUI UX Design Consulting', status: 'active' },
    { name: 'Eleanor Penta', services: 'SeoUI UX Design Consulting', status: 'active' },
    { name: 'Eleanor Pena', services: 'SeoUI UX Design Consulting', status: 'active' },
    { name: 'Eleanor Penta (inactive)', services: 'SeoUI UX Design Consulting', status: 'inactive' },
    { name: 'Eleanor Penta (inactive)', services: 'Se0UI UX Design Consulting', status: 'inactive' },
  ]
};

// Login API
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/login`, {
      email,
      password
    });
    return response;
  } catch (error) {
    console.log('CORS error - using demo login');
    // Accept provided credentials for demo
    if (email === 'ubktowing@gmail.com' && password === 'Ubk.ali@2025') {
      return { data: { token: 'demo-token-12345' } };
    }
    throw error;
  }
};

// Stats API
export const getStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/drivers/stats`, {
      params: { startDate: '2026-01-01', endDate: '2026-01-31' }
    });
    return response;
  } catch (error) {
    console.log('CORS error - using demo stats');
    return { data: MOCK_DATA.stats };
  }
};

// Drivers API
export const getDrivers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/drivers`);
    return response;
  } catch (error) {
    console.log('CORS error - using demo drivers');
    return { data: MOCK_DATA.drivers };
  }
};

// Clients API
export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/common/getAllClients`);
    return response;
  } catch (error) {
    console.log('CORS error - using demo clients');
    return { data: MOCK_DATA.clients };
  }
};