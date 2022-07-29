<template>
  <div class="home-header">
    <n-avatar
      v-if="avatarUrl"
      round
      size="medium"
      :src="avatarUrl"
    />
    <div v-else class="grant">Hello, {{ user.userInfo.username }}</div>
    <svg-icon class="icon-indent" name="indent" @click="active = !active" />
    <n-drawer v-model:show="active" :width="250" placement="right">
      <RightSideMenu @onChoose="onChoose" />
    </n-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import RightSideMenu from './RightSideMenu.vue'
import { NAvatar, NDrawer } from 'naive-ui'

const user = useUserStore()
const avatarUrl = user.userInfo.avatar

const active = ref(false)
const onChoose = () => {
  active.value = false
}

</script>

<style lang="stylus" scoped>
.home-header
  box-sizing border-box
  position fixed
  top 0
  left 0
  z-index 1
  width 100%
  height 40px
  padding 10px
  display flex
  justify-content space-between
  align-items center
  background-color #34495E
  .icon-indent
    width 20px
    height 20px
    color #d8e0e9

</style>
