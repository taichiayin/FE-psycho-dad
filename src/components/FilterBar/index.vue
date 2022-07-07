<template>
  <div class="filter-bar">
    <div class="box country">
      <n-select
        v-model:value="country"
        size="small"
        :options="countryList"
        placeholder="縣市"
      />
    </div>
    <div class="box area">
      <n-select
        v-model:value="area"
        size="small"
        :options="areaList"
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
import { ref } from 'vue'
import { NSelect, NInput } from 'naive-ui'

const country = ref(null)
const area = ref(null)
const type = ref(null)
const keyword = ref(null)
const countryList = ref([
  {
    label: '高雄市',
    value: '1'
  },
  {
    label: '高雄縣',
    value: '2'
  }
])
const areaList = ref([
  {
    label: '左營區',
    value: '1'
  },
  {
    label: '鳳山區',
    value: '2'
  }

])
const typeList = ref([
  {
    label: '餐飲',
    value: '1'
  },
  {
    label: '汽車',
    value: '1'
  }
])

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
