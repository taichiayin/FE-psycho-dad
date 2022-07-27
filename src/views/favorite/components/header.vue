<template>
  <div class="favorite-header">
    <SvgIcon class="icon-arrow-left" name="arrow-left" @click="goBack" />

    <div class="title">
      <SvgIcon class="icon-heart" name="heart" />
      我的收藏
    </div>
    <svg-icon class="icon-indent" name="indent" @click="active = !active" />
  </div>
  <n-drawer v-model:show="active" :width="250" placement="right">
    <RightSideMenu />
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NDrawer } from 'naive-ui'
import RightSideMenu from '@/views/home/components/RightSideMenu.vue'

const router = useRouter()
const active = ref(false)

const goBack = () => {
  router.go(-1)
}

</script>

<style lang="stylus" scoped>
.favorite-header
  position fixed
  top 0
  left 0
  box-sizing border-box
  width 100%
  padding 10px
  z-index 1
  display flex
  justify-content space-between
  align-items center
  background-color #34495E
  .icon-arrow-left
    width 36px
    height 36px
    color #fff
  .title
    display flex
    justify-content center
    align-items center
    font-size 24px
    color #fff
    .icon-heart
      width 36px
      height 36px
      margin-right 10px
      color #d63031
  .icon-indent
    width 36px
    height 36px
    color #fff

</style>
