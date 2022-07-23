import { createRouter, createWebHistory } from 'vue-router'

import home from './modules/home.js'
import login from './modules/login.js'
import edit from './modules/edit.js'
import favorite from './modules/favorite.js'

const routes = []
routes.push(home)
routes.push(login)
routes.push(edit)
routes.push(favorite)

// routes.push({
//   path: '*',
//   redirect: { name: 'PageNotFound' }
// })

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
