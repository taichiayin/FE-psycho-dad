export default {
  path: '/edit',
  name: 'Edit',
  component: () => import(/* webpackChunkName: "Home" */ '@/views/edit/index.vue')
}
