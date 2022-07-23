<template>
  <div class="favorite">
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
        <!-- <div class="content">
          <div class="dis">約距離{{ item.dis }}KM</div>
        </div> -->
        </n-card>
      <!-- <InfiniteLoading :first-load="false" @infinite="loadMoreData" /> -->
      </n-space>
    </div>
  </div>
</template>

<script>
export default { name: 'Favorite' }
</script>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { NCard, NSpace } from 'naive-ui'
import Header from './components/header.vue'
import FilterBar from '@/components/FilterBar/index.vue'
import { getFavorites } from '@/api/favorite.js'
import { useUserStore } from '@/store/user.js'

const user = useUserStore()
const storeList = ref([])
const show = ref(false)
const data = ref(null)
const filters = reactive({
  page: 1,
  size: 20
})

const init = async s => {
  try {
    const { code, data } = await getFavorites(user.userInfo.id, filters)
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

</style>
