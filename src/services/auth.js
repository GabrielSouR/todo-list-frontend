// src/services/auth.js

export function isAuthenticated() {
    return !!localStorage.getItem('token')
  }
  
  export function logout() {
    localStorage.removeItem('token')
  }
  