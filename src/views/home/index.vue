<template>
  <div class="home">
    <Header />
    <FilterBar />
    <div class="main">
      <n-space class="wrap" vertical>
        <n-card
          v-for="item in storeList"
          :key="item.id"
          class="card"
          size="small"
          :title="item.name"
          @click="onStoreClick(item.id)"
        >
          <template #cover>
            <img :src="item.defaultImg">
          </template>
        </n-card>
      </n-space>
    </div>
    <Footer />
    <StoreDetailModal v-model:value="show" :store-id="storeId" />
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
import img1 from '@/assets/imgs/domplin.png'
import { getUser } from '@/api/users.js'

const storeList = ref([
  {
    id: 1,
    name: '左營老麵館',
    defaultImg: img1
  },
  {
    id: 2,
    name: '阿發蒸餃',
    defaultImg: img1
  },
  {
    id: 2,
    name: '阿發蒸餃',
    defaultImg: img1
  },
  {
    id: 2,
    name: '阿發蒸餃',
    defaultImg: img1
  },
  {
    id: 2,
    name: '阿發蒸餃',
    defaultImg: img1
  },
  {
    id: 2,
    name: '阿發蒸餃',
    defaultImg: img1
  },
  {
    id: 2,
    name: '阿發蒸餃',
    defaultImg: img1
  }
])

const storeId = ref(null)
const show = ref(false)

const onStoreClick = id => {
  storeId.value = id
  show.value = true
}

onMounted(async() => {
  const res = await getUser()
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
.card
  height 200px
</style>

