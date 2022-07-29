export default {
  path: '/',
  name: 'Home',
  meta: {
    keepAlive: true
  },
  component: () => import(/* webpackChunkName: "Home" */ '@/views/home/index.vue')
}
