<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="mb-0">Minhas Tarefas</h3>
      <button class="btn btn-outline-danger btn-sm" @click="handleLogout">Sair</button>
    </div>

    <!-- Formulário de nova tarefa -->
    <form @submit.prevent="addTodo" class="input-group mb-4">
      <input
        type="text"
        class="form-control"
        placeholder="Digite uma nova tarefa"
        v-model="newTodoTitle"
        required
      />
      <button class="btn btn-primary" type="submit">Adicionar</button>
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
        <button class="btn btn-primary" type="submit">Buscar</button>
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
            <button
              class="btn btn-outline-success btn-sm"
              @click="toggleCompleted(todo)"
            >
              {{ todo.completed ? 'Reabrir' : 'Concluir' }}
            </button>
            <button class="btn btn-outline-primary btn-sm" @click="startEdit(todo)">Editar</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteTodo(todo.id)">Excluir</button>
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

async function saveEdit(todo) {
  if (editTitle.value.trim()) {
    await updateTodo(todo.id, { title: editTitle.value })
    cancelEdit()
  }
}

async function toggleCompleted(todo) {
  await updateTodo(todo.id, { completed: !todo.completed })
}
</script>
