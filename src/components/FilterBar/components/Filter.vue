<template>
  <div class="filter">
    <div class="header">
      <div class="cancel" @click="cancel">取消</div>
      <div class="title">搜尋</div>
      <div class="confirm" @click="confirm">確定</div>
    </div>
    <div class="body">
      <div class="box country">
        <n-select
          v-model:value="filters.countyId"
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
          v-model:value="filters.districtId"
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
          v-model:value="filters.typeId"
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
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { NSelect } from 'naive-ui'
import { getAllCounties } from '@/api/counties.js'
import { getAllDistricts } from '@/api/districts.js'
import { getAllTypes } from '@/api/types.js'

// const county = ref(null)
// const district = ref(null)
// const type = ref(null)
const filters = ref({
  countyId: null,
  districtId: null,
  typeId: null
})
const countyList = ref([])
const districtList = ref([])
const typeList = ref([])

const emit = defineEmits(['onCountyChange', 'onDistrictChange', 'onTypeChange', 'cancel', 'confirm'])

const cancel = () => {
  emit('cancel')
}

const confirm = () => {
  emit('confirm', filters.value)
}

const handleCountyUpdate = async val => {
  filters.value.district = null
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
.filter
  box-sizing border-box
  width 100%
  padding-bottom 30px
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color #d8e0e9
  .header
    position relative
    box-sizing border-box
    width 100%
    padding 10px
    font-size 20px
    font-weight bold
    // border-bottom 1px solid #8a93a8
    text-align center
    .cancel
      position absolute
      top 50%
      left 10px
      transform translateY(-50%)
      padding 0 5px
      font-weight normal
      font-size 14px
      font-weight normal
      color #FF9C9C
      border-radius 4px
      border 1px solid #FF9C9C
    .confirm
      position absolute
      top 50%
      right 10px
      transform translateY(-50%)
      padding 0 5px
      font-size 14px
      font-weight normal
      color #fff
      border-radius 4px
      background-color #7ABAFF
  .body
    box-sizing border-box
    width 100%
    padding 10px
    display flex
    flex-direction column
    justify-content center
    align-items center
    .box
      width 200px
      border-bottom 2px solid #c4c9d4
      margin-bottom 10px
      .n-select
        // margin-bottom 10px
        :deep(.n-base-selection-label)
          font-size 18px
          height 40px
          background-color #d8e0e9
        :deep(.n-base-selection__border), :deep(.n-base-selection__state-border)
          display none
        :deep(.n-base-selection-placeholder)
          color black
          background-color #d8e0e9

</style>
