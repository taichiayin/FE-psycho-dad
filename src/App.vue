<template>
  <router-view />
</template>

<script>
export default { name: 'App' }
</script>

<script setup>
import { initFacebook } from './utils/fb'

// FaceBook init
initFacebook()

</script>

<style lang="stylus">
html,
body,
#app
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color #353B48

</style>
