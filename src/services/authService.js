import api from './api'

// Login
export async function login(email, password) {
  const response = await api.post('/api/auth/login', { email, password })
  return response.data
}

// Cadastro
export async function register(name, email, password) {
  const response = await api.post('/api/auth/register', { name, email, password })
  return response.data
}
