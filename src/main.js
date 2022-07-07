import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
// 引入路由
import router from './router'
// 权限控制
import './permission'
// 引入svg图标注册脚本
import 'virtual:svg-icons-register'

import './assets/style/cssreset.css'

// 注册全局组件
import * as Components from './global-components'
Object.entries(Components).forEach(([key, component]) => {
  app.component(key, component)
})

app
  .use(router)
  .use(createPinia())
  .mount('#app')

