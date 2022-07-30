<template>
  <div class="home">
    <Header />
    <FilterBar
      @filterConfirm="filterConfirm"
    />
    <div class="main">
      <ItemBox
        v-for="item in storeList"
        :key="item.storeId"
        v-model:value="isShowStoreDetail"
        :row-data="item"
        @onItemClick="onItemClick"
      />
      <InfiniteLoading :first-load="false" @infinite="loadMoreData" />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import FilterBar from '@/components/FilterBar/index.vue'
import ItemBox from '@/components/ItemBox/index.vue'
import { getStores } from '@/api/stores.js'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'

const router = useRouter()
const storeList = ref([])
const isShowStoreDetail = ref(false)
// const isLocating = ref(false)
const filters = reactive({
  page: 1,
  size: 20
})

const init = async() => {
  try {
    const { code, data } = await getStores(filters)
    if (code === 1) {
      if (filters.page === 1) storeList.value = []
      if (data.length < filters.size) {
        storeList.value.push(...data)
      } else {
        storeList.value.push(...data)
      }
      filters.page++
    }
  } catch (error) {
    console.log(error)
  }
}

const onItemClick = item => {
  router.push({ path: `/itemDetail/${item.storeId}` })
}

const filterConfirm = data => {
  const { countyId, districtId, typeId, storeName } = data
  filters.countyId = countyId
  filters.districtId = districtId
  filters.typeId = typeId
  filters.storeName = storeName
  filters.page = 1
  init()
}

const loadMoreData = async $state => {
  try {
    const { code, data } = await getStores(filters)
    if (code === 1) {
      if (filters.page === 1) storeList.value = []
      if (data.length < filters.size) {
        storeList.value.push(...data)
        $state.complete()
      } else {
        storeList.value.push(...data)
        $state.loaded()
      }
      filters.page++
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async() => {
  // isLocating.value = true
  const { code, data } = await getStores(filters)
  if (code === 1) {
    storeList.value.push(...data)
    filters.page++
    // isLocating.value = false
  }
  // 獲取裝置目前座標
  // const geoLoc = navigator.geolocation
  // geoLoc.getCurrentPosition(success, errorHandler, { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 })
})

</script>

<style lang="stylus" scoped>
.home
  position relative
  padding-top 192px
.main
  width auto
  padding 10px 20px 200px 20px
  .item-box
    margin-bottom 20px
:deep(.n-card-header)
  span
    color #eb4d4b
    font-size 40px
    font-weight bold

</style>

