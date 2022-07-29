<template>
  <div class="favorite">
    <Header />
    <FilterBar
      @filterConfirm="filterConfirm"
    />
    <div class="main">
      <ItemBox
        v-for="item in storeList"
        :key="item.storeId"
        :row-data="item"
        @onItemClick="onItemClick(item)"
      />
      <!-- <InfiniteLoading :first-load="false" @infinite="loadMoreData" /> -->
    </div>
  </div>
</template>

<script>
export default { name: 'Favorite' }
</script>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import Header from './components/header.vue'
import FilterBar from '@/components/FilterBar/index.vue'
import ItemBox from '@/components/ItemBox/index.vue'
import { useRouter } from 'vue-router'
import { getFavorites } from '@/api/favorite.js'
// import { useUserStore } from '@/store/user.js'

// const user = useUserStore()
const router = useRouter()
const storeList = ref([])
// const show = ref(false)
// const data = ref(null)
const filters = reactive({
  page: 1,
  size: 20
})

const init = async s => {
  try {
    const { code, data } = await getFavorites(filters)
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

onMounted(() => {
  init()
})

</script>

<style lang="stylus" scoped>
.favorite
  position relative
  padding-top 125px
  .main
    width auto
    padding 5px 10px 10px 10px
    .item-box
      margin-bottom 10px

</style>
