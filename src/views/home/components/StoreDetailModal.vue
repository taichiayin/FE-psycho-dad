<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    :auto-focus="false"
    :mask-closable="false"
    :show-icon="false"
    :bordered="false"
  >
    <div class="store-detail">
      <div class="title">{{ props.data.storeName }}</div>
      <div v-if="props.data.defaultImg ||props.data.img1 ||props.data.img2" class="carousel">
        <n-carousel
          effect="fade"
          dot-type="line"
          :interval="3000"
          autoplay
        >
          <img
            v-if="props.data.defaultImg"
            class="carousel-img"
            :src="props.data.defaultImg"
          >
        </n-carousel>
      </div>
      <div class="opt-wrap">
        <div class="bg" :class="{active: isFavorite}" @click="getFavorite">
          <SvgIcon class="icon-heart" name="heart" />
        </div>
      </div>
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
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue'
import { NModal, NCarousel, useMessage } from 'naive-ui'
import { useUserStore } from '@/store/user.js'
import { CreateFavorite, DeleteFavorite } from '@/api/favorite.js'

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

const user = useUserStore()
const nMessage = useMessage()
const isFavorite = ref(false)
const emit = defineEmits(['update:value'])
const visible = computed({
  get: () => props.value,
  set: val => emit('update:value', val)
})

const getFavorite = async() => {
  if (isFavorite.value) {
    const { code } = await DeleteFavorite({ storeId: props.data.storeId, userId: user.userInfo.id })
    if (code === 1) {
      isFavorite.value = false
      nMessage.success('移除收藏')
    }
  } else {
    const { code } = await CreateFavorite({ storeId: props.data.storeId, userId: user.userInfo.id })
    if (code === 1) {
      isFavorite.value = true
      nMessage.success('收藏成功')
    }
  }
}

onMounted(() => {
  isFavorite.value = !!(props.data.favoriteId)
})

</script>

<style lang="stylus" scoped>
.store-detail
  width 100%
  height 600px
  box-sizing border-box
  // padding 10px
  // border-radius 8px
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
  .opt-wrap
    width auto
    padding 5px
    display flex
    justify-content flex-end
    align-items center
    .bg
      width 28px
      height 28px
      display flex
      justify-content center
      align-items center
      border-radius 50%
      background-color #b2bec3
      .icon-heart
        width 18px
        height 18px
        color #fff
      &.active
        background-color #d63031
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
