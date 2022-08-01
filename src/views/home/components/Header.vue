<template>
  <div class="home-header">
    <van-image
      v-if="avatarUrl"
      round
      :src="avatarUrl"
    />
    <div v-else class="grant">Hello, {{ user.userInfo.username }}</div>
    <svg-icon class="icon-indent" name="indent" @click="active = !active" />
    <van-popup
      v-model:show="active"
      :style="{ width: '250px' }"
      position="right"
      teleport="#app"
    >
      <RightSideMenu @onChoose="onChoose" />
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import RightSideMenu from './RightSideMenu.vue'

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
  height 80px
  padding 20px
  display flex
  justify-content space-between
  align-items center
  background-color #34495E
  .icon-indent
    width 40px
    height 40px
    color #d8e0e9

</style>
