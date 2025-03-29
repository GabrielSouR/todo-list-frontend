// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import TodoView from '../views/TodoView.vue'
import { isAuthenticated } from '../services/auth'

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: AuthView },
  { 
    path: '/tasks', 
    component: TodoView, 
    meta: { requiresAuth: true } // rota protegida
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Proteção global das rotas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/auth') // não está autenticado, vai para login
  } else {
    next() // está autenticado, segue em frente
  }
})

export default router
