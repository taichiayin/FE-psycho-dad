<template>
  <n-modal v-model:show="visible">
    <div class="store-detail">
      <div class="title">{{ props.data.storeName }}</div>
      <!-- <div class="carousel"> -->
      <!-- <n-carousel
          effect="fade"
          dot-type="line"
          :interval="3000"
          autoplay
        >
          <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
          >
          <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
          >
          <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
          >
          <img
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
          >
        </n-carousel> -->
      <!-- </div> -->
      <div v-if="props.data.introduce" class="introduce">
        {{ props.data.introduce }}
      </div>
      <div v-if="props.data.address" class="address">
        <div class="text">{{ props.data.address }}</div>
        <a :href="`https://www.google.com/maps/search/?api=1&query=${props.data.address}`"><SvgIcon class="icon" name="copy" /></a>
      </div>
      <div v-if=" props.data.phone" class="phone">
        <a class="text" href="tel:02-27383930">{{ props.data.phone }}</a>
        <SvgIcon class="icon" name="phone" />
      </div>
      <div v-if=" props.data.mobile" class="mobile">
        <a class="text" href="tel:0928-888-999">{{ props.data.mobile }}</a>
        <SvgIcon class="icon" name="mobile" />
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue'
import { NModal } from 'naive-ui'
import SvgIcon from '../../../components/SvgIcon/index.vue'

const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  value: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:value'])
const visible = computed({
  get: () => props.value,
  set: val => emit('update:value', val)
})

</script>

<style lang="stylus" scoped>
.store-detail
  width 90%
  height 600px
  box-sizing border-box
  padding 10px
  border-radius 8px
  background-color #fff
  .title
    width 100%
    font-size 20px
    font-weight bold
    margin-bottom 5px
  .carousel
    width 100%
    height 200px
    overflow hidden
    border-radius 4px
    .carousel-img
      width 100%
      height 200px
      object-fit cover
  .introduce
    width 100%
    box-sizing border-box
    margin-top 5px
    padding 5px 5px 20px 5px
    border-radius 4px
    line-height 1.43
    letter-spacing 0.25px
    background-color #efefef
    font-family PingFangSC-Regular

  .address, .phone, .mobile
    display flex
    justify-content center
    align-items center
    box-sizing border-box
    width 100%
    margin-top 5px
    padding 5px
    border-radius 4px
    background-color #efefef
    letter-spacing 0.25px
    font-family PingFangSC-Regular
    .text
      margin-right 10px
    .icon
      width 20px
      height 20px
</style>
