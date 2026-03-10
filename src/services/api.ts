import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeResume = async (file: File) => {
  // In a real app, we would send the file to the backend
  // For this demo, we'll simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'success', message: 'Resume analyzed successfully' });
    }, 2000);
  });
};

export default api;
