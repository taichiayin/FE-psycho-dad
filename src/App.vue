<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>

<script>
export default { name: 'App' }
</script>

<script setup>
import { onMounted } from '@vue/runtime-core'
import { attachAutoResize } from '@/utils/resizeScreen.js'
import 'vant/lib/index.css'

attachAutoResize()

onMounted(() => {
})

</script>

<style lang="stylus">
html,
body,
#app
  width 100%
  height 100%
  margin 0
  padding 0
  font-size 32px
  color rgba(255,255,255,.7)
  background-color #34495E
  font-family PingFangSC-Regular
</style>
