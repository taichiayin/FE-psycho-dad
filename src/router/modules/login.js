export default {
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')
}
