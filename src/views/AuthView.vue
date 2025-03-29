<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-center mb-3">
              <button class="btn" :class="{'btn-primary': isLogin, 'btn-outline-primary': !isLogin}" @click="isLogin = true">Login</button>
              <button class="btn ms-2" :class="{'btn-primary': !isLogin, 'btn-outline-primary': isLogin}" @click="isLogin = false">Cadastro</button>
            </div>
  
            <form v-if="isLogin" @submit.prevent="handleLogin">
              <h5 class="text-center mb-3">Faça seu Login</h5>
              <input type="email" class="form-control mb-2" placeholder="Email" v-model="loginForm.email" required>
              <input type="password" class="form-control mb-2" placeholder="Senha" v-model="loginForm.password" required>
              <button class="btn btn-success w-100" type="submit">Entrar</button>
            </form>
  
            <form v-else @submit.prevent="handleRegister">
              <h5 class="text-center mb-3">Faça seu Cadastro</h5>
              <input type="text" class="form-control mb-2" placeholder="Nome" v-model="registerForm.name" required>
              <input type="email" class="form-control mb-2" placeholder="Email" v-model="registerForm.email" required>
              <input type="password" class="form-control mb-2" placeholder="Senha" v-model="registerForm.password" required>
              <button class="btn btn-primary w-100" type="submit">Cadastrar</button>
            </form>
  
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

const {
  isLogin,
  loginForm,
  registerForm,
  handleLogin,
  handleRegister
} = useAuth()
</script>
  