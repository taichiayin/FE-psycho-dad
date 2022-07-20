<template>
  <div class="filter-bar">
    <div class="row">
      <div class="box country">
        <n-select
          v-model:value="county"
          size="small"
          clearable
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
          clearable
          :options="districtList"
          label-field="name"
          value-field="districtId"
          placeholder="鄉鎮區"
          @update:value="handleDistrictUpdate"
        />
      </div>
      <div class="box type">
        <n-select
          v-model:value="type"
          size="small"
          clearable
          :options="typeList"
          label-field="name"
          value-field="typeId"
          placeholder="類型"
          @update:value="handleTypeUpdate"
        />
      </div>
    </div>
    <div class="row">
      <div class="box keyword">
        <n-input
          v-model:value="keyword"
          size="small"
          type="text"
          placeholder="關鍵字"
          @update:value="handleKeywordUpdate"
        />
      </div>
      <n-button size="small" type="info" @click="onSortClick">
        近到遠排序
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { getAllCounties } from '@/api/counties.js'
import { getAllDistricts } from '@/api/districts.js'
import { getAllTypes } from '@/api/types.js'
import { NSelect, NInput, NButton } from 'naive-ui'

const emit = defineEmits(['onCountyChange', 'onDistrictChange', 'onTypeChange', 'onKeywordChange', 'onSortClick'])

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
  emit('onCountyChange', val)
}

const handleDistrictUpdate = val => {
  emit('onDistrictChange', val)
}

const handleTypeUpdate = val => {
  emit('onTypeChange', val)
}

const handleKeywordUpdate = val => {
  emit('onKeywordChange', val)
}

const onSortClick = () => {
  console.log('onSortClick')
  emit('onSortClick')
}

onMounted(async() => {
  const { code, data } = await getAllCounties()
  if (code === 1) {
    countyList.value = data
  }
  const { code: typeCode, data: typeData } = await getAllTypes()
  if (typeCode === 1) {
    typeList.value = typeData
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
  flex-direction column
  justify-content center
  align-items center
  background-color #353B48
  .row
    width 100%
    margin-bottom 5px
    display flex
    justify-content flex-start
    align-items center
    .box
      width 30%
      margin-right 10px
</style>
