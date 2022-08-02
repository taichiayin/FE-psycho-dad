<template>
  <div class="item-detail">
    <EnsureBackgroundImage
      class="default-img"
      :src="defaultImgUrl"
      :default-src="defaultImg"
    >
      <div class="icon-wrap arrow-left">
        <SvgIcon class="icon-arrow-left" name="arrow-left" @click="goBack" />
      </div>
      <div class="icon-wrap heart">
        <SvgIcon
          class="icon-heart"
          :class="{active: isFavorite}"
          name="heart"
          @click="getFavorite"
        />
      </div>
    </EnsureBackgroundImage>
    <div class="content">
      <div class="title">{{ rowData.storeName }}</div>
      <div v-if="rowData.introduce" class="introduce">{{ rowData.introduce }}</div>
      <div v-if="rowData.address" class="row address">
        <SvgIcon class="icon" name="store" />
        {{ rowData.address }}
        <a :href="`https://www.google.com/maps/search/?api=1&query=${rowData.address}`"><SvgIcon class="icon-leave" name="leave" /></a>
      </div>
      <div v-if="rowData.phone" class="row phone">
        <SvgIcon class="icon" name="phone" />
        <a class="text" :href="`tel:${rowData.phone}`">{{ rowData.phone }}</a>
      </div>
      <div v-if="rowData.mobile" class="row mobile">
        <SvgIcon class="icon" name="mobile" />
        <a class="text" :href="`tel:${rowData.mobile}`">{{ rowData.mobile }}</a>
      </div>
      <div v-if="rowData.email" class="row email">
        <SvgIcon class="icon" name="email" />
        {{ rowData.email }}
      </div>
      <div v-if="rowData.webSite" class="row web-site">
        <SvgIcon class="icon" name="webSite" />
        <a class="text" :href="`${rowData.webSite}`" target="_blank">{{ rowData.webSite }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Notify } from 'vant'
import { useUserStore } from '@/store/user.js'
import { useRouter, useRoute } from 'vue-router'
import { getStoreDetail } from '@/api/stores.js'
import { CreateFavorite, DeleteFavorite } from '@/api/favorite.js'
import EnsureBackgroundImage from '@/components/EnsureBackgroundImage/index.vue'
import defaultImg from '@/assets/imgs/default-item.png'
import SvgIcon from '../../components/SvgIcon/index.vue'

const user = useUserStore()
const router = useRouter()
const route = useRoute()
// const nMessage = useMessage()
const rowData = ref({})
const isFavorite = ref(false)

const goBack = () => {
  router.go(-1)
}

const defaultImgUrl = computed(() => {
  return import.meta.env.DEV ? rowData.value.defaultImg : `https://api.taixchi8.com${rowData.value.defaultImg}`
})

const getFavorite = async() => {
  if (isFavorite.value) {
    const { code } = await DeleteFavorite({ storeId: rowData.value.storeId, userId: user.userInfo.userId })
    if (code === 1) {
      isFavorite.value = false
      Notify({ type: 'success', message: '移除收藏' })
    }
  } else {
    const { code } = await CreateFavorite({ storeId: rowData.value.storeId, userId: user.userInfo.userId })
    if (code === 1) {
      isFavorite.value = true
      Notify({ type: 'success', message: '收藏成功' })
    }
  }
}

onMounted(async() => {
  const storeId = route.params.id

  const { code, data } = await getStoreDetail(storeId)
  if (code === 1) {
    rowData.value = data
    isFavorite.value = !!(data.favoriteId)
  }
})
</script>

<style lang="stylus" scoped>
.item-detail
  box-sizing border-box
  width 100%
  min-height 100vh
  background-color #34495E
  .default-img
    position relative
    width 100%
    height 400px
    background-repeat no-repeat
    background-position center
    background-size cover

    .icon-wrap
      position absolute
      width 60px
      height 60px
      display flex
      justify-content center
      align-items center
      border-radius 50%
      background-color rgba(255,255,255,.7)
      &.arrow-left
        top 20px
        left 20px
        .icon-arrow-left
          width 40px
          height 40px
          color #666
      &.heart
        top 20px
        right 20px
        .icon-heart
          width 40px
          height 40px
          color #c2c2c2
          &.active
            color #ff7675
  .content
    box-sizing border-box
    position relative
    top -40px
    width 100%
    padding 60px 40px 40px 40px
    display flex
    flex-direction column
    justify-content center
    align-items center
    border-radius 32px
    color #000
    background-color #fff
    &:after
      content ''
      position absolute
      top 10px
      left 50%
      transform translateX(-50%)
      width 100px
      height 10px
      border-radius 10px
      background-color #e5ebf1
    .title
      width 100%
      margin-bottom 40px
      font-size 48px
      font-weight bold
      letter-spacing 2.6px
      color #08a1c4

    .introduce
      width 100%
      font-size 28px
      margin-bottom 40px
      letter-spacing 1px
      line-height 1.5
      color #28D0F6
    .row
      width 100%
      margin-bottom 40px
      display flex
      justify-content flex-start
      align-items center
      letter-spacing 1px
      font-size 32px
      color #08a1c4
      &.address
        font-weight bold
      .icon
        width 40px
        height 40px
        margin-right 20px
      .icon-leave
        width 32px
        height 32px
        margin-left 20px
</style>
