// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importando CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.use(router)
app.mount('#app')