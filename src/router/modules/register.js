export default {
  path: '/register',
  name: 'Register',
  component: () => import(/* webpackChunkName: "Login" */ '@/views/register/index.vue')
}
