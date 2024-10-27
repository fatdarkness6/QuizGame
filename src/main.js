import './assets/main.css'
import { createMemoryHistory, createRouter } from 'vue-router'
import questionsPage from './components/questionsPage/questionsPage.vue'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: questionsPage,
    },
  ]
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
