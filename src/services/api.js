import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Substitua pela URL da sua API backend
  timeout: 5000 // Tempo limite em milissegundos
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
