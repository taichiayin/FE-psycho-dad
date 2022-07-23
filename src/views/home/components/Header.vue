<template>
  <div class="home-header">
    <n-avatar round size="medium" :src="avatarUrl" />
    <svg-icon class="icon-indent" name="indent" @click="active = !active" />
    <n-drawer v-model:show="active" :width="250" placement="right">
      <RightSideMenu />
    </n-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import RightSideMenu from './RightSideMenu.vue'
import { NAvatar, NDrawer } from 'naive-ui'

const userStore = useUserStore()
const avatarUrl = userStore.userInfo.avatar

const active = ref(false)

</script>

<style lang="stylus" scoped>
.home-header
  box-sizing border-box
  position fixed
  top 0
  left 0
  z-index 1
  width 100%
  padding 10px
  display flex
  justify-content space-between
  align-items center
  background-color #353B48
  .icon-indent
    width 36px
    height 36px

</style>
