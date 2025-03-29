import { ref, reactive } from 'vue'
import { login, register } from '../services/authService'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()
  const isLogin = ref(true)

  const loginForm = reactive({
    email: '',
    password: ''
  })

  const registerForm = reactive({
    name: '',
    email: '',
    password: ''
  })

  async function handleLogin() {
    try {
      const result = await login(loginForm.email, loginForm.password)
      console.log('Login realizado com sucesso!', result)

      // Salvar token no localStorage
      localStorage.setItem('token', result.token)

      // Redirecionar para página de tarefas após login
      router.push('/tasks')

    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Falha no login, verifique suas credenciais.')
    }
  }

  async function handleRegister() {
    try {
      const result = await register(registerForm.name, registerForm.email, registerForm.password)
      console.log('Cadastro realizado com sucesso!', result)

      // Opcionalmente, após cadastro, redirecionar para login automaticamente
      isLogin.value = true
      alert('Cadastro realizado com sucesso! Faça login.')

    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      alert('Falha no cadastro, verifique seus dados.')
    }
  }

  return {
    isLogin,
    loginForm,
    registerForm,
    handleLogin,
    handleRegister
  }
}
