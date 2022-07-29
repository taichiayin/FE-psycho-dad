export default {
  path: '/itemDetail/:id',
  name: 'ItemDetail',
  component: () => import(/* webpackChunkName: "ItemDetail" */ '@/views/itemDetail/index.vue')
}
