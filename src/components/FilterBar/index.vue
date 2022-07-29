<template>
  <div class="filter-bar">
    <div class="input-wrap">
      <div class="keyword">
        <input v-model="filters.storeName" type="text" placeholder="搜尋店名">
        <SvgIcon class="icon-search" name="magnifying-glass" @click="handleKeywordUpdate" />
      </div>
      <div class="btn-filter">
        <SvgIcon class="icon-filter" name="sliders" @click="active = !active" />
      </div>
    </div>
    <n-drawer
      v-model:show="active"
      class="drawer-filter"
      height="auto"
      placement="bottom"
      resizable
    >
      <Filter @cancel="filterCancel" @confirm="filterConfirm" />
    </n-drawer>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { NDrawer } from 'naive-ui'
import Filter from './components/Filter.vue'

const emit = defineEmits(['onKeywordChange', 'filterConfirm'])

const active = ref(false)
const filters = ref({
  storeName: null
})
// const keyword = ref(null)

const handleKeywordUpdate = e => {
  emit('filterConfirm', filters.value)
}

const filterCancel = () => {
  active.value = false
}

const filterConfirm = data => {
  active.value = false
  filters.value = { ...filters.value, ...data }
  emit('filterConfirm', filters.value)
}

</script>

<style lang="stylus" scoped>
.filter-bar
  box-sizing border-box
  position fixed
  top 40px
  left 50%
  transform translateX(-50%)
  z-index 1
  width 100%
  // height 40px
  padding 10px 10px
  // margin-top 10px
  display flex
  justify-content center
  align-items center
  border-radius 8px
  background-color #34495E
  .input-wrap
    width 100%
    display flex
    .keyword
      position relative
      flex 1
      input
        box-sizing border-box
        width 100%
        height 40px
        padding 0 40px 0 10px
        border-radius 8px
        background-color #d8e0e9
        font-family PingFangSC-Regular
      .icon-search
        position absolute
        right 10px
        top 50%
        width 20px
        height 20px
        transform translateY(-50%)
        color #727d97
    .btn-filter
      width 40px
      height 40px
      display flex
      justify-content center
      align-items center
      margin-left 10px
      border-radius 8px
      background-color #d8e0e9
      .icon-filter
        width 20px
        height 20px
        color #727d97
</style>
<style lang="stylus">
.drawer-filter
  &.n-drawer
    border-radius 16px 16px 0 0
  .n-drawer-content-wrapper
    border-radius 16px 16px 0 0

</style>
