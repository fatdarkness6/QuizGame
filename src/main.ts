import './assets/main.css'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import { router } from './router/index'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Notifications)
app.use(createPinia())
app.mount('#app')
