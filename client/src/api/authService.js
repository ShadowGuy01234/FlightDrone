// src/api/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Change this to your backend URL

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed');
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Login failed');
  }
};
