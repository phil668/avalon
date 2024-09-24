import '@unocss/reset/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import { router } from './routes'


createApp(App).use(router).mount('#app')
