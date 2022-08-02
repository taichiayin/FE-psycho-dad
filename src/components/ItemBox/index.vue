<template>
  <div class="item-box" @click="onItemClick(item)">
    <EnsureBackgroundImage
      v-if="props.rowData.defaultImg"
      class="default-img"
      :src="defaultImgUrl"
      :default-src="defaultImg"
    />
    <div class="content">
      <div class="name">{{ props.rowData.storeName }}</div>
      <div class="loc">
        <SvgIcon class="icon-location" name="location" />
        <div class="county">{{ props.rowData.countyName }}</div>
        <div class="district">{{ props.rowData.districtName }}</div>
      </div>
      <div v-if="props.rowData.isClosePermanently" class="icon-wrap">
        <SvgIcon class="permanentlyClose" name="permanentlyClose" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import EnsureBackgroundImage from '@/components/EnsureBackgroundImage/index.vue'
import defaultImg from '@/assets/imgs/default-item.png'

const props = defineProps({
  rowData: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['onItemClick', 'update:value'])
// const showModal = ref(false)

const defaultImgUrl = computed(() => {
  return import.meta.env.DEV ? props.rowData.defaultImg : `https://api.taixchi8.com${props.rowData.defaultImg}`
})

const onItemClick = item => {
  emit('onItemClick', props.rowData)
}

</script>

<style lang="stylus" scoped>
.item-box
  width 100%
  display flex
  flex-direction column
  justify-content center
  align-items center
  border-radius 16px
  overflow hidden
  color #000
  background-color #d8e0e9
  .default-img
    width 100%
    height 200px
    background-repeat no-repeat
    background-position center
    background-size cover
  .content
    box-sizing border-box
    position relative
    width 100%
    padding 20px
    .name
      margin-bottom 20px
      font-size 24px
      font-weight bold
      letter-spacing 1.3px
    .loc
      display flex
      justify-content flex-start
      align-items center
      .icon-location
        font-size 24px
        color #3bd4f7
        margin-right 5px
      .county
        font-size 14px
        color #08a1c4
        padding 2px 5px
        border-radius 4px
        border 1px dashed #08a1c4
      .district
        font-size 14px
        color #28D0F6
        padding  2px 5px
        margin-left 5px
        border-radius 4px
        border 1px dashed #28D0F6
    .icon-wrap
      position absolute
      top 5px
      right 5px
      width auto
      display flex
      justify-content center
      align-items center
      .permanentlyClose
        width 80px
        height 80px
        transform rotate(45deg)
        color #FF7675

</style>
