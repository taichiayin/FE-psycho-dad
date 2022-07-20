<template>
  <div class="home">
    <Header />
    <FilterBar
      @onCountyChange="onCountyChange"
      @onDistrictChange="onDistrictChange"
      @onTypeChange="onTypeChange"
      @onKeywordChange="onKeywordChange"
      @onSortClick="sortByDis"
    />
    <div class="main">
      <n-space v-if="!islocating" class="wrap" vertical>
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
        <InfiniteLoading :first-load="false" @infinite="loadMoreData" />
      </n-space>
      <n-spin v-if="islocating" class="spin">
        <template #description>
          定位中，請稍候...
        </template>
      </n-spin>
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
import { onMounted, reactive, ref } from 'vue'
import { NCard, NSpace, NSpin, useMessage } from 'naive-ui'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import StoreDetailModal from './components/StoreDetailModal.vue'
import FilterBar from '@/components/FilterBar/index.vue'
import { getStores } from '@/api/stores.js'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'

window.$Nmessage = useMessage()
const storeList = ref([])
const show = ref(false)
const data = ref(null)
const islocating = ref(false)
const filters = reactive({
  PageIndex: 1,
  PageSize: 20
})

const init = async s => {
  try {
    const { code, data } = await getStores(filters)
    if (code === 1) {
      if (filters.PageIndex === 1) storeList.value = []
      if (data.length < filters.PageSize) {
        storeList.value.push(...data)
        s.complete()
      } else {
        storeList.value.push(...data)
        s.loaded()
      }
      filters.PageIndex++
    }
  } catch (error) {
    console.log(error)
  }
}

const onStoreClick = item => {
  data.value = item
  show.value = true
}

const onCountyChange = val => {
  filters.CountyId = val
  filters.DistrictId = null
  filters.PageIndex = 1
  init()
}
const onDistrictChange = val => {
  filters.DistrictId = val
  filters.PageIndex = 1
  init()
}
const onTypeChange = val => {
  filters.TypeId = val
  filters.PageIndex = 1
  init()
}
const onKeywordChange = val => {
  filters.Name = val
  filters.PageIndex = 1
  init()
}

const loadMoreData = $state => {
  init($state)
}

const errorHandler = async() => {
  window.$Nmessage.error('定位失敗，使用離線模式')
  filters.lon = 0
  filters.lat = 0
  if (storeList.value.length > 0) return
  try {
    const { code, data } = await getStores(filters)
    if (code === 1) {
      storeList.value.push(...data)
      filters.PageIndex++
    }
  } catch (error) {
    console.log(error)
  }
}

const success = async p => {
  islocating.value = false
  // console.log(p)
  filters.lon = p.coords.longitude
  filters.lat = p.coords.latitude
  // 有資料不要再load，更新位置就好
  if (storeList.value.length > 0) return
  try {
    const { code, data } = await getStores(filters)
    if (code === 1) {
      storeList.value.push(...data)
      filters.PageIndex++
    }
  } catch (error) {
    console.log(error)
  }
}

const sortByDis = () => {
  console.log('sortByDis')
  storeList.value.sort((a, b) => {
    return a.dis - b.dis
  })
}

onMounted(() => {
  islocating.value = true
  // 獲取裝置目前座標
  const geoLoc = navigator.geolocation
  geoLoc.getCurrentPosition(success, errorHandler, { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 })
})

</script>

<style lang="stylus" scoped>
.home
  position relative
  padding-top 120px
.main
  width auto
  padding 5px 10px 10px 10px
  .wrap
    margin-bottom 100px
  .spin
    width 100%
    margin-top 100px
  .content
    width 100%
    .dis
      width 100%
      text-align right
      color #888

</style>

