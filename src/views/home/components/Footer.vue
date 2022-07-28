<template>
  <div class="footer">
    <div class="btn" :class="{'active': active ==='ours' }" @click="act('ours')">
      <svg-icon class="bread" name="man" />
      <div class="text">大叔們的</div>
    </div>
    <div
      class="btn"
      :class="{'active': active ==='rec' }"
      @click="act('rec')"
    >
      <svg-icon class="thumb" name="thumb" />
      <div class="text">大叔們推薦的</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref('ours')

const act = val => {
  active.value = val
}

</script>

<style lang="stylus" scoped>
.footer
  position fixed
  width 100%
  height 44px
  bottom 0
  left 0
  display flex
  justify-content space-around
  align-items center
  background-color #d8e0e9
  box-sizing border-box
  .btn
    display flex
    justify-content center
    align-items center
    color #777
    .bread
      width 20px
      height 20px
      fill #777
    .thumb
      width 20px
      height 20px
      fill #777
    .text
      font-weight bold
      margin-left 5px
    &.active
      color #000
      .icon
        fill #000

</style>
