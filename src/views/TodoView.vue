<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="mb-0">Minhas Tarefas</h3>
      <button class="btn btn-outline-danger btn-sm" @click="handleLogout">Sair</button>
    </div>

    <div v-if="alert.message" :class="`alert alert-${alert.type}`" role="alert">
      {{ alert.message }}
    </div>

    <!-- Formulário de nova tarefa -->
    <form @submit.prevent="handleAddTodo" class="input-group mb-4">
      <input
        type="text"
        class="form-control"
        placeholder="Digite uma nova tarefa"
        v-model="newTodoTitle"
        required
      />
      <button class="btn btn-primary" type="submit">
        <i class="bi bi-plus-lg me-1"></i> Adicionar
      </button>
    </form>

    
    <!-- Filtros -->
    <div class="d-flex flex-wrap justify-content-between mb-3 gap-2">
      <div class="btn-group">
        <button class="btn btn-outline-secondary" @click="applyFilter(null)">Todos</button>
        <button class="btn btn-outline-success" @click="applyFilter(true)">Concluídos</button>
        <button class="btn btn-outline-warning" @click="applyFilter(false)">Pendentes</button>
      </div>

      <!-- Busca -->
      <form @submit.prevent="search" class="d-flex gap-2">
        <input
          type="text"
          class="form-control"
          v-model="searchTerm"
          placeholder="Buscar tarefa"
        />
        <button class="btn btn-primary" type="submit">
          <i class="bi bi-search me-1"></i> Buscar
        </button>
      </form>
    </div>

    <!-- Estado de carregamento -->
    <template v-if="isLoading" class="alert alert-info">
      Carregando tarefas...
    </template>

    <!-- Lista de tarefas -->
    <template v-else-if="todos.length">
      <ul class="list-group">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div class="flex-grow-1 me-3">
            <div v-if="editId === todo.id">
              <input
                type="text"
                class="form-control form-control-sm mb-2"
                v-model="editTitle"
              />
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-success" @click="saveEdit(todo)">Salvar</button>
                <button class="btn btn-sm btn-secondary" @click="cancelEdit">Cancelar</button>
              </div>
            </div>
            <div v-else>
              <span :class="{ 'text-decoration-line-through': todo.completed }">
                {{ todo.title }}
              </span>
              <br />
              <small class="text-muted">Status: {{ todo.completed ? 'Concluída' : 'Pendente' }}</small>
            </div>
          </div>

          <div class="d-flex flex-column gap-1">
            <button class="btn btn-outline-success btn-sm" @click="toggleCompleted(todo)">
              <i :class="todo.completed ? 'bi bi-arrow-counterclockwise' : 'bi bi-check-lg'" class="me-1"></i>
              {{ todo.completed ? 'Reabrir' : 'Concluir' }}
            </button>
            <button class="btn btn-outline-primary btn-sm" @click="startEdit(todo)">
              <i class="bi bi-pencil me-1"></i> Editar
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="handleDelete(todo.id)">
              <i class="bi bi-trash me-1"></i> Excluir
            </button>
          </div>
        </li>
      </ul>

      <!-- Paginação -->
      <nav v-if="totalPages > 1" class="mt-4">
        <ul class="pagination justify-content-center">
          <li
            class="page-item"
            :class="{ disabled: page === 1 }"
            @click="changePage(page - 1)"
          >
            <a class="page-link" href="#">Anterior</a>
          </li>

          <li
            v-for="p in totalPages"
            :key="p"
            class="page-item"
            :class="{ active: page === p }"
            @click="changePage(p)"
          >
            <a class="page-link" href="#">{{ p }}</a>
          </li>

          <li
            class="page-item"
            :class="{ disabled: page === totalPages }"
            @click="changePage(page + 1)"
          >
            <a class="page-link" href="#">Próxima</a>
          </li>
        </ul>
      </nav>
    </template>

    <!-- Nenhuma tarefa -->
    <template v-else class="alert alert-warning">
      Nenhuma tarefa cadastrada ainda!
    </template>
  </div>
</template>

<script setup>
import { useTodos } from '../composables/useTodos'
import { logout } from '../services/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const {
  todos,
  isLoading,
  newTodoTitle,
  addTodo,
  updateTodo,
  deleteTodo,
  page,
  totalPages,
  searchTerm,
  changePage,
  applyFilter,
  search
} = useTodos()

function handleLogout() {
  logout()
  router.push('/auth')
}

const editId = ref(null)
const editTitle = ref('')

function startEdit(todo) {
  editId.value = todo.id
  editTitle.value = todo.title
}

function cancelEdit() {
  editId.value = null
  editTitle.value = ''
}

async function toggleCompleted(todo) {
  await updateTodo(todo.id, { completed: !todo.completed })
}

const alert = ref({ type: '', message: '' })

function showAlert(type, message, duration = 3000) {
  alert.value = { type, message }
  setTimeout(() => {
    alert.value = { type: '', message: '' }
  }, duration)
}

async function handleAddTodo() {
  try {
    await addTodo()
    showAlert('success', 'Tarefa adicionada com sucesso!')
  } catch {
    showAlert('danger', 'Erro ao adicionar tarefa.')
  }
}

async function handleDelete(id) {
  const confirmed = confirm('Tem certeza que deseja excluir esta tarefa?')
  if (!confirmed) return

  try {
    await deleteTodo(id)
    showAlert('success', 'Tarefa excluída com sucesso!')
  } catch {
    showAlert('danger', 'Erro ao excluir tarefa.')
  }
}

async function saveEdit(todo) {
  if (editTitle.value.trim()) {
    try {
      await updateTodo(todo.id, { title: editTitle.value })
      cancelEdit()
      showAlert('success', 'Tarefa atualizada com sucesso!')
    } catch {
      showAlert('danger', 'Erro ao atualizar tarefa.')
    }
  }
}
</script>
