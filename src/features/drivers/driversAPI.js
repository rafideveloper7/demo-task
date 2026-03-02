import { mockDriversData } from '../../services/mockData';

// Get all drivers - using mock data for now
// When CORS is fixed, i will replace this with real API
export const getDriversAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockDriversData,
        message: 'Drivers fetched successfully',
      });
    }, 600);
  });
};

// Get stats for drivers between two dates
export const getDriversStatsAPI = async (startDate, endDate) => {
  const { generateMockStats } = await import('../../services/mockData');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: generateMockStats(startDate, endDate),
        message: 'Stats fetched successfully',
      });
    }, 800);
  });
};