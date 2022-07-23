export default {
  path: '/favorite',
  name: 'Favorite',
  component: () => import(/* webpackChunkName: "Home" */ '@/views/favorite/index.vue')
}
