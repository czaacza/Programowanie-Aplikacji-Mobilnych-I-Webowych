// auth.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

export const handleLogin = async (userData, setIsLoggedIn) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    console.log('Login response:', response.data);
    const { token, userId } = response.data;

    if (response.status !== 200) {
      throw new Error('Invalid credentials');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    setIsLoggedIn(true);
  } catch (error) {
    console.error('Login error:', error.response || error);
  }
};
