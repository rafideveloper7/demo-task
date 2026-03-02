import { mockClientsData } from '../../services/mockData';

// Get all clients - using mock data for now
// When CORS is fixed, replace this with real API
export const getClientsAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockClientsData,
        message: 'Clients fetched successfully',
      });
    }, 600);
  });
};

// i will use when backend CORS is fixed
/*
import axiosInstance from '../../services/axios';

export const getClientsAPI = async () => {
  try {
    const response = await axiosInstance.get('/common/getAllClient');
    return response.data.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
*/