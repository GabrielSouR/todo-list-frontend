# 🖼️ To-do List Frontend

Aplicação web responsiva para gerenciamento de tarefas com autenticação, filtros, busca, paginação e CRUD completo, conectada a uma API segura.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-42b883?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-Dev%20Server-ff69b4?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-blueviolet?logo=bootstrap)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)

---

## 🚀 Tecnologias Utilizadas

- Vue.js 3 (Composition API)
- Vite
- Bootstrap 5
- Bootstrap Icons
- Axios (com JWT via headers)
- Vue Router
- JavaScript moderno (ESM)

---

## 📦 Instalação

```bash
git clone https://github.com/GabrielSouR/todo-list-frontend.git
cd todo-list-frontend
npm install
```

---

## ▶️ Como executar

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

> ⚠️ Certifique-se de que o backend (`todo-list-api`) esteja rodando em `http://localhost:3000` (ou ajuste a URL da API em `src/services/api.js`).

---

## 🔐 Funcionalidades

- ✅ Registro e login com autenticação JWT
- ✅ Proteção de rotas com Vue Router
- ✅ Tela de login/registro separada
- ✅ CRUD completo de tarefas (criar, editar, concluir, excluir)
- ✅ Busca por título
- ✅ Filtros de status (Todos | Concluídos | Pendentes)
- ✅ Paginação de resultados
- ✅ Feedbacks visuais com Bootstrap Alerts
- ✅ Ícones intuitivos com Bootstrap Icons
- ✅ Separação de lógica (composables) e interface (views)
- ✅ Responsivo e pronto para produção

---

## 🗂️ Estrutura do Projeto

```
src/
├── assets/              # Estilos e imagens
├── components/          # Componentes reutilizáveis (em breve)
├── composables/         # Funções reutilizáveis (como useTodos)
├── router/              # Definição das rotas
├── services/            # API, autenticação, etc.
├── views/               # Telas principais (AuthView, TodoView)
└── main.js              # Ponto de entrada da aplicação
```

---

## 🔄 Integração com Backend

Este frontend está conectado à API:

➡️ [To-do List API (Node + MySQL)](https://github.com/GabrielSouR/todo-list-backend)

---

## 👨‍💻 Desenvolvido por

**Gabriel de Souza Ribeiro**  
Projeto fullstack com o objetivo de estudar práticas modernas de desenvolvimento web com Vue.js e Node.js.

---

<p align="center">
  Feito com 💚 por um dev que ama código limpo
</p>