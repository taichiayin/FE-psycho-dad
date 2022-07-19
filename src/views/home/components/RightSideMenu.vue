<template>
  <div class="right-side-menu">
    <div class="btn" @click="logout">登出</div>
    <div class="btn" @click="goEdit">編輯模式</div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

const logout = () => {
  window.FB.getLoginStatus(res => {
    window.FB.logout((response) => {
      console.log(response)
      user.clearInfo()
      router.replace({ name: 'Login' })
    })
  })
}

const goEdit = () => {
  router.push({ name: 'Edit' })
}

</script>

<style lang="stylus" scoped>
.right-side-menu
  width 100%
  height 100%
  padding 20px
  color rgba(255,255,255,.7)
  background-color #353b48
</style>
