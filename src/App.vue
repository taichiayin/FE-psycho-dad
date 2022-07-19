<template>
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>

<script>
export default { name: 'App' }
</script>

<script setup>
import { onMounted } from '@vue/runtime-core'
import { NMessageProvider } from 'naive-ui'

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
  font-size 16px
  color rgba(255,255,255,.7)
  background-color #353B48
  font-family PingFangSC-Regular
</style>
