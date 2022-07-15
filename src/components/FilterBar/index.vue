<template>
  <div class="filter-bar">
    <div class="box country">
      <n-select
        v-model:value="county"
        size="small"
        label-field="name"
        value-field="countyId"
        :options="countyList"
        placeholder="縣市"
        @update:value="handleCountyUpdate"
      />
    </div>
    <div class="box area">
      <n-select
        v-model:value="district"
        size="small"
        :options="districtList"
        label-field="name"
        value-field="districtId"
        placeholder="鄉鎮區"
      />
    </div>
    <div class="box type">
      <n-select
        v-model:value="type"
        size="small"
        :options="typeList"
        placeholder="類型"
      />
    </div>
    <div class="box keyword">
      <n-input
        v-model:value="keyword"
        size="small"
        type="text"
        placeholder="關鍵字"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAllCounties } from '@/api/counties.js'
import { getAllDistricts } from '@/api/districts.js'
import { NSelect, NInput } from 'naive-ui'

const county = ref(null)
const district = ref(null)
const type = ref(null)
const keyword = ref(null)
const countyList = ref([])
const districtList = ref([])
const typeList = ref([])

const handleCountyUpdate = async val => {
  district.value = null
  const { code, data } = await getAllDistricts({ countyId: val })
  if (code === 1) {
    districtList.value = data
  }
}

onMounted(async() => {
  const { code, data } = await getAllCounties()
  if (code === 1) {
    countyList.value = data
  }
})

</script>

<style lang="stylus" scoped>
.filter-bar
  box-sizing border-box
  position fixed
  top 50px
  left 0
  z-index 1
  width 100%
  padding 0 10px 10px 10px
  display flex
  justify-content space-evenly
  align-items center
  background-color #353B48
  .box
    width 24%

</style>
