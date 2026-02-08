// import axios from 'axios';

// // Create an instance using the proxy path
// const api = axios.create({
//   baseURL: '/api', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Automatically add Token to requests if it exists
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // <--- Updated to point directly to backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add Token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Matches your middleware logic
  }
  return config;
});

export default api;