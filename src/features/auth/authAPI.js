// import axiosInstance from '../../services/axios';

// MOCK LOGIN - No actual API call (CORS disabled on backend)
export const loginAPI = async (email, password) => {
  // Simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock validation
      if (email === 'ubktowing@gmail.com' && password === 'Ubk.ali@2025') {
        const mockUser = {
          id: 1,
          email: email,
          name: 'Admin User',
          role: 'admin',
          avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=random',
          department: 'Administration',
          joinDate: '2024-01-15',
        };

        const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);

        resolve({
          success: true,
          data: mockUser,
          token: mockToken,
          message: 'Login successful',
        });
      } else {
        reject({
          message: 'Invalid email or password',
          code: 'AUTH_ERROR',
        });
      }
    }, 800); // Simulate 800ms network delay
  });
};

// i will uncomment when backend CORS is fixed
/*
export const loginAPI = async (email, password) => {
  try {
    const response = await axiosInstance.post('/admin/login', { email, password });
    const token = response.data.token || response.data.data?.token;
    
    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(response.data.data || response.data));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
*/