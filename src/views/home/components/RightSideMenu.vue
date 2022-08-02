<template>
  <div class="right-side-menu">
    <div class="btn" @click="logout">登出</div>
    <div v-if="user.userInfo.isAdmin" class="btn" @click="goEdit">編輯模式</div>
    <div class="btn" @click="goFavorite">我的收藏</div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router'

const emit = defineEmits(['onChoose'])

const user = useUserStore()
const router = useRouter()

const logout = () => {
  emit('onChoose')
  user.clearInfo()
  router.replace({ name: 'Login' })
}

const goEdit = () => {
  emit('onChoose')
  router.push({ name: 'Edit' })
}

const goFavorite = () => {
  emit('onChoose')
  router.push({ name: 'Favorite' })
}

</script>

<style lang="stylus" scoped>
.right-side-menu
  box-sizing border-box
  width 100%
  height 100vh
  padding 40px
  color rgba(255,255,255,.7)
  background-color #34495E
  .btn
    width 100%
    height 80px
    font-size 48px
</style>
