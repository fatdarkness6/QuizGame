import './assets/main.css'
import { createWebHistory, createRouter } from 'vue-router'
import questionsPage from './components/questionsPage/questionsPage.vue'
import showHowManyUserParticipateInQuiz from './components/showHowManyUserParticipateInQuiz/showHowManyUserParticipateInQuiz.vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

import { createApp } from 'vue'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: questionsPage,
    },
    {
      path : "/userInfo",
      component : showHowManyUserParticipateInQuiz
    }
  ]
})

const app = createApp(App)
app.use(router)
app.use(Notifications)
app.use(createPinia())
app.mount('#app')
