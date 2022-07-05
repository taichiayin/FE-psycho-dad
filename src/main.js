import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

// 引入路由
import router from './router'

app
  .use(router)
  .use(createPinia())
  .mount('#app')

