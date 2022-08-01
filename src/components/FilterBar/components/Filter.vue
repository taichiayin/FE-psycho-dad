<template>
  <div class="filter">
    <div class="header">
      <div class="cancel" @click="cancel">取消</div>
      <div class="title">搜尋</div>
      <div class="confirm" @click="confirm">確定</div>
    </div>
    <div class="body">
      <van-field
        v-model="countyName"
        is-link
        readonly
        label="城市"
        placeholder="選擇城市"
        @click="showCountyPicker = true"
      />
      <van-field
        v-model="districtName"
        is-link
        readonly
        label="鄉鎮區"
        placeholder="選擇鄉鎮區"
        @click="showDistrictPicker = true"
      />
      <van-field
        v-model="typeName"
        is-link
        readonly
        label="類型"
        placeholder="選擇類型"
        @click="showTypePicker = true"
      />

      <van-popup v-model:show="showCountyPicker" round position="bottom">
        <van-picker
          :columns="countyList"
          confirm-button-text="確定"
          cancel-button-text="取消"
          @cancel="showCountyPicker = false"
          @confirm="onCountyConfirm"
        />
      </van-popup>
      <van-popup v-model:show="showDistrictPicker" round position="bottom">
        <van-picker
          :columns="districtList"
          confirm-button-text="確定"
          cancel-button-text="取消"
          @cancel="showDistrictPicker = false"
          @confirm="onDistrictConfirm"
        />
      </van-popup>
      <van-popup v-model:show="showTypePicker" round position="bottom">
        <van-picker
          :columns="typeList"
          confirm-button-text="確定"
          cancel-button-text="取消"
          @cancel="showTypePicker = false"
          @confirm="onTypeConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { getAllCounties } from '@/api/counties.js'
import { getAllDistricts } from '@/api/districts.js'
import { getAllTypes } from '@/api/types.js'

const showCountyPicker = ref(false)
const showDistrictPicker = ref(false)
const showTypePicker = ref(false)

const filters = ref({
  countyId: null,
  districtId: null,
  typeId: null
})

const countyName = ref(null)
const districtName = ref(null)
const typeName = ref(null)

const countyList = ref([])
const districtList = ref([])
const typeList = ref([])

const emit = defineEmits(['onCountyChange', 'cancel', 'confirm'])

const cancel = () => {
  emit('cancel')
}

const confirm = () => {
  emit('confirm', filters.value)
}

const onCountyConfirm = async val => {
  filters.value.districtId = null
  districtName.value = null
  filters.value.countyId = val.value
  countyName.value = val.text
  const { code, data } = await getAllDistricts({ countyId: val.value })
  if (code === 1) {
    districtList.value = data.map(item => {
      return {
        text: item.name,
        value: item.districtId
      }
    })
  }
  showCountyPicker.value = false
}
const onDistrictConfirm = val => {
  filters.value.districtId = val.value
  districtName.value = val.text
  showDistrictPicker.value = false
}
const onTypeConfirm = val => {
  filters.value.typeId = val.value
  typeName.value = val.text
  showTypePicker.value = false
}

onMounted(async() => {
  const { code, data } = await getAllCounties()
  if (code === 1) {
    countyList.value = data.map(item => {
      return {
        text: item.name,
        value: item.countyId
      }
    })
  }
  const { code: typeCode, data: typeData } = await getAllTypes()
  if (typeCode === 1) {
    typeList.value = typeData.map(item => {
      return {
        text: item.name,
        value: item.typeId
      }
    })
  }
})

</script>

<style lang="stylus" scoped>
.filter
  box-sizing border-box
  width 100%
  padding-bottom 60px
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color #d8e0e9
  .header
    position relative
    box-sizing border-box
    width 100%
    padding 20px
    font-size 40px
    font-weight bold
    text-align center
    .title
      color #646566
    .cancel
      position absolute
      top 50%
      left 20px
      transform translateY(-50%)
      padding 10px 10px
      font-weight normal
      font-size 28px
      font-weight normal
      color #FF9C9C
      border-radius 8px
      border 2px solid #FF9C9C
    .confirm
      position absolute
      top 50%
      right 20px
      transform translateY(-50%)
      padding 10px 10px
      font-size 28px
      font-weight normal
      color #fff
      border-radius 8px
      background-color #7ABAFF
  .body
    // height 500px
    .van-cell
      height 80px
      margin-bottom 40px
      border-radius 16px
      background-color #d8e0e9
      &:after
        border-bottom 4px solid #ccc

</style>
