import { ref, onMounted } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

export function useTodos() {
  const router = useRouter()
  const todos = ref([])
  const isLoading = ref(true)
  const newTodoTitle = ref('')

  const page = ref(1)
  const totalPages = ref(1)
  const completedFilter = ref(null)
  const searchTerm = ref('')

  async function loadTodos() {
    isLoading.value = true

    try {
      const params = {
        page: page.value,
        limit: 5
      }

      if (completedFilter.value !== null) {
        params.completed = completedFilter.value
      }

      if (searchTerm.value.trim()) {
        params.search = searchTerm.value.trim()
      }

      const response = await api.get('/tasks', { params })

      todos.value = response.data.tasks
      totalPages.value = Math.ceil(response.data.total / response.data.limit)
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
      if (error.response?.status === 401) router.push('/auth')
    } finally {
      isLoading.value = false
    }
  }

  async function addTodo() {
    if (!newTodoTitle.value.trim()) return
  
    try {
      const response = await api.post('/tasks', {
        title: newTodoTitle.value
      })
      todos.value.unshift(response.data)
      newTodoTitle.value = ''
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error)
      throw error
    }
  }  

  async function updateTodo(id, updates) {
    try {
      const response = await api.patch(`/tasks/${id}`, updates)
  
      const index = todos.value.findIndex(t => t.id === id)
      if (index !== -1) {
        todos.value.splice(index, 1, response.data)
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
      throw error
    }
  }  

  async function deleteTodo(id) {
    try {
      await api.delete(`/tasks/${id}`)
      todos.value = todos.value.filter(t => t.id !== id)
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
      throw error
    }
  }  

  function changePage(p) {
    page.value = p
    loadTodos()
  }
  
  function applyFilter(completed) {
    completedFilter.value = completed
    page.value = 1
    loadTodos()
  }
  
  function search() {
    page.value = 1
    loadTodos()
  }  

  onMounted(loadTodos)

  return {
    todos,
    isLoading,
    newTodoTitle,
    page,
    totalPages,
    completedFilter,
    searchTerm,
    addTodo,
    updateTodo,
    deleteTodo,
    loadTodos,
    changePage,
    applyFilter,
    search
  }
}
