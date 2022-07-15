<template>
  <div class="home">
    <Header />
    <FilterBar />
    <div class="main">
      <n-space class="wrap" vertical>
        <n-card
          v-for="item in storeList"
          :key="item.storeId"
          class="card"
          size="small"
          :title="item.storeName"
          @click="onStoreClick(item)"
        >
          <template v-if="item.defaultImg" #cover>
            <img :src="item.defaultImg">
          </template>
          <div class="content">
            <div class="dis">約距離{{ item.dis }}KM</div>
          </div>
        </n-card>
      </n-space>
    </div>
    <Footer />
    <StoreDetailModal v-model:value="show" :data="data" />
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { NCard, NSpace } from 'naive-ui'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import StoreDetailModal from './components/StoreDetailModal.vue'
import FilterBar from '@/components/FilterBar/index.vue'
import { getStores } from '@/api/stores.js'

const storeList = ref([])

const show = ref(false)
const data = ref(null)

const onStoreClick = item => {
  data.value = item
  show.value = true
}

onMounted(() => {
  // 獲取裝置目前座標
  window.navigator.geolocation.getCurrentPosition(async p => {
    const { code, data } = await getStores({ lon: p.coords.longitude, lat: p.coords.latitude })
    if (code === 1) {
      storeList.value = data
    }
  })
})

</script>

<style lang="stylus" scoped>
.home
  position relative
  padding-top 90px
.main
  width auto
  padding 5px 10px 10px 10px
  .wrap
    margin-bottom 100px
// .card
//   height 200px
  .content
    width 100%
    .dis
      width 100%
      text-align right
      color #888

</style>

