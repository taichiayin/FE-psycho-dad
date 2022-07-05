export default {
  path: '/',
  name: 'Home',
  component: () => import(/* webpackChunkName: "Home" */ '@/views/home/index.vue')
}
