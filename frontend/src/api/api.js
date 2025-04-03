import axios from 'axios'

const api = axios.create({
  baseURL: 'https://movie-app-backend-1-8a7k.onrender.com/api' // Replace with your backend URL
})

// Add authorization header if the user is logged in
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export default api
