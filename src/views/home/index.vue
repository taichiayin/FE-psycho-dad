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
          :bordered="false"
          @click="onStoreClick(item)"
        >
          <template v-if="item.defaultImg" #cover>
            <img :src="item.defaultImg">
          </template>
          <template v-if="item.storeName" #header>
            {{ item.storeName }} <span>{{ item.isClosePermanently?'已歇業':'' }}</span>
          </template>
          <div class="content">
            <div class="county">{{ item.countyName }}</div>
            <div class="district">{{ item.districtName }}</div>
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
    <StoreDetailModal v-if="show" v-model:value="show" :data="data" />
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
import { useUserStore } from '@/store/user.js'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import StoreDetailModal from './components/StoreDetailModal.vue'
import FilterBar from '@/components/FilterBar/index.vue'
import { getStores } from '@/api/stores.js'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'

const user = useUserStore()
const Nmessage = useMessage()
const storeList = ref([])
const show = ref(false)
const data = ref(null)
const islocating = ref(false)
const filters = reactive({
  page: 1,
  size: 20
})

const init = async s => {
  try {
    const { code, data } = await getStores(filters)
    if (code === 1) {
      if (filters.page === 1) storeList.value = []
      if (data.length < filters.size) {
        storeList.value.push(...data)
        s.complete()
      } else {
        storeList.value.push(...data)
        s.loaded()
      }
      filters.page++
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
  filters.page = 1
  init()
}
const onDistrictChange = val => {
  filters.DistrictId = val
  filters.page = 1
  init()
}
const onTypeChange = val => {
  filters.TypeId = val
  filters.page = 1
  init()
}
const onKeywordChange = val => {
  filters.Name = val
  filters.page = 1
  init()
}

const loadMoreData = $state => {
  init($state)
}

const errorHandler = async() => {
  Nmessage.error('定位失敗，使用離線模式')
  filters.lon = 0
  filters.lat = 0
  filters.id = user.userInfo.id
  if (storeList.value.length > 0) return
  try {
    const { code, data } = await getStores(filters)
    if (code === 1) {
      storeList.value.push(...data)
      filters.page++
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
  filters.id = user.userInfo.id

  // 有資料不要再load，更新位置就好
  if (storeList.value.length > 0) return
  try {
    const { code, data } = await getStores(filters)
    if (code === 1) {
      storeList.value.push(...data)
      filters.page++
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
  padding-top 125px
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
    display flex
    .county
      margin-right 10px
      padding 0 5px
      border 1px solid #74b9ff
      border-radius 20px
      color #74b9ff
    .district
      padding 0 5px
      border 1px solid #81ecec
      border-radius 20px
      color #81ecec
    .dis
      flex 1
      text-align right
      color #888
:deep(.n-card-header)
  span
    color #eb4d4b
    font-size 20px
    font-weight bold

</style>

