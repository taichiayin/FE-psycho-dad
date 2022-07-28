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
        :row-data="item"
        @onItemClick="onItemClick"
      />
      <InfiniteLoading :first-load="false" @infinite="loadMoreData" />
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
// import { NCard } from 'naive-ui'
// import { useUserStore } from '@/store/user.js'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import StoreDetailModal from './components/StoreDetailModal.vue'
import FilterBar from '@/components/FilterBar/index.vue'
import ItemBox from '@/components/ItemBox/index.vue'
import { getStores } from '@/api/stores.js'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'

// const user = useUserStore()
// const Nmessage = useMessage()
const storeList = ref([])
const show = ref(false)
const data = ref(null)
const islocating = ref(false)
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
  data.value = item
  show.value = true
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
  islocating.value = true
  const { code, data } = await getStores(filters)
  if (code === 1) {
    storeList.value.push(...data)
    filters.page++
    islocating.value = false
  }
  // 獲取裝置目前座標
  // const geoLoc = navigator.geolocation
  // geoLoc.getCurrentPosition(success, errorHandler, { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 })
})

</script>

<style lang="stylus" scoped>
.home
  position relative
  padding-top 96px
.main
  width auto
  padding 5px 10px 100px 10px
  .item-box
    margin-bottom 10px
  // .spin
  //   width 100%
  //   margin-top 100px
  // .content
  //   width 100%
  //   display flex
  //   .county
  //     margin-right 10px
  //     padding 0 5px
  //     border 1px solid #74b9ff
  //     border-radius 20px
  //     color #74b9ff
  //   .district
  //     padding 0 5px
  //     border 1px solid #81ecec
  //     border-radius 20px
  //     color #81ecec
  //   .dis
  //     flex 1
  //     text-align right
  //     color #888
:deep(.n-card-header)
  span
    color #eb4d4b
    font-size 20px
    font-weight bold

</style>

