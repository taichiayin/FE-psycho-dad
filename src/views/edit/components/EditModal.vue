<template>
  <van-popup
    v-model:show="visible"
    :style="{width:'90%'}"
    round
  >
    <div class="edit">
      <van-form
        ref="formRef"
        class="form"
        label-align="right"
      >
        <van-cell-group inset>
          <!-- <n-input v-model:value="form.storeName" placeholder="名稱" /> -->
          <van-field
            v-model="form.storeName"
            label="名稱"
            clearable
            placeholder="请输入名稱"
          />
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
          <van-field
            v-model="form.introduce"
            rows="2"
            label="介紹"
            type="textarea"
            maxlength="500"
            placeholder="请输入介紹"
            show-word-limit
          />
          <van-field
            v-model="form.address"
            label="地址"
            clearable
            placeholder="请输入地址"
          />
          <van-field
            v-model="form.mobile"
            label="手機"
            clearable
            placeholder="请输入手機"
          />
          <van-field
            v-model="form.phone"
            label="電話"
            clearable
            placeholder="请输入電話"
          />
          <van-field
            v-model="form.webSite"
            label="網站"
            clearable
            placeholder="请输入網站"
          />
          <van-field
            v-model="form.email"
            label="電子信箱"
            clearable
            placeholder="请输入電子信箱"
          />
          <van-field class="image-upload" label="圖片上傳">
            <template #input>
              <div class="upload-wrap">
                <img
                  v-if="form.defaultImg"
                  class="defalut-img"
                  :src="form.defaultImg"
                  alt=""
                >
                <UploadImage :reload="!!form.defaultImg" @cropperConfirm="handleImgUrl" />
              </div>
            </template>
          </van-field>
          <van-field
            v-model="form.lon"
            type="number"
            label="經度"
            clearable
            placeholder="經度 數值: 0-180"
          />
          <van-field
            v-model="form.lat"
            type="number"
            label="緯度"
            clearable
            placeholder="緯度 數值: 0-90"
          />
          <van-field
            v-model="isDadOptionName"
            is-link
            readonly
            label="大叔的店"
            placeholder="請選擇"
            @click="showIsDadPicker = true"
          />
          <van-field
            v-model="isDadsRecommendOptionName"
            is-link
            readonly
            label="大叔推薦"
            placeholder="請選擇"
            @click="showIsDadRecommendPicker = true"
          />
          <van-field
            v-model="isClosePermanentlyOptionName"
            is-link
            readonly
            label="是否歇業"
            placeholder="請選擇"
            @click="showIsClosePicker = true"
          />
        </van-cell-group>
      </van-form>
      <div class="btn-wrap">
        <van-button
          round
          plain
          size="small"
          type="default"
          @click="visible = false"
        >
          取消
        </van-button>
        <van-button
          round
          size="small"
          type="primary"
          @click="submit"
        >
          送出
        </van-button>
      </div>

      <!-- 彈窗區塊 -->
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
      <van-popup v-model:show="showIsDadPicker" round position="bottom">
        <van-picker
          :columns="isDadsList"
          confirm-button-text="確定"
          cancel-button-text="取消"
          @cancel="showIsDadPicker = false"
          @confirm="onIsDadConfirm"
        />
      </van-popup>
      <van-popup v-model:show="showIsDadRecommendPicker" round position="bottom">
        <van-picker
          :columns="isDadsRecommendList"
          confirm-button-text="確定"
          cancel-button-text="取消"
          @cancel="showIsDadRecommendPicker = false"
          @confirm="onIsDadRecommendConfirm"
        />
      </van-popup>
      <van-popup v-model:show="showIsClosePicker" round position="bottom">
        <van-picker
          :columns="isClosePermanentlyList"
          confirm-button-text="確定"
          cancel-button-text="取消"
          @cancel="showIsClosePicker = false"
          @confirm="onIsCloseConfirm"
        />
      </van-popup>
    </div>
  </van-popup>
</template>

<script setup>
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue'
// import { NModal, NForm, NFormItem, NInput, NButton, NSelect, NInputNumber, NInputGroup, NInputGroupLabel } from 'naive-ui'
// import { useMessage } from 'naive-ui'
import { getAllCounties } from '@/api/counties.js'
import { getAllDistricts } from '@/api/districts.js'
import { getAllTypes } from '@/api/types.js'
import { CreateStore, UpdateStore } from '@/api/stores.js'
import UploadImage from '@/components/UploadImage/index.vue'
import { Notify } from 'vant'

const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'query'
  },
  value: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:value', 'submited'])
const form = ref({
  countyId: null,
  dis: null,
  imgList: null,
  defaultImg: ''
})

const showCountyPicker = ref(null)
const showDistrictPicker = ref(null)
const showTypePicker = ref(null)
const countyName = ref(null)
const districtName = ref(null)
const typeName = ref(null)
const countyList = ref([])
const districtList = ref([])
const typeList = ref([])

const showIsDadPicker = ref(null)
const showIsDadRecommendPicker = ref(null)
const showIsClosePicker = ref(null)
const isDadOptionName = ref(null)
const isDadsRecommendOptionName = ref(null)
const isClosePermanentlyOptionName = ref(null)
const isDadsList = ref([
  { text: '是，大叔開的店', value: true },
  { text: '否，不是大叔開的店', value: false }
])
const isDadsRecommendList = ref([
  { text: '是，大叔推薦的店', value: true },
  { text: '否，不是大叔推薦的店', value: false }
])
const isClosePermanentlyList = ref([
  { text: '已歇業', value: true },
  { text: '正常營業中', value: false }
])

const visible = computed({
  get: () => props.value,
  set: val => emit('update:value', val)
})

const onCountyConfirm = async val => {
  form.value.districtId = null
  districtName.value = null
  form.value.countyId = val.value
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
  form.value.districtId = val.value
  districtName.value = val.text
  showDistrictPicker.value = false
}
const onTypeConfirm = val => {
  form.value.typeId = val.value
  typeName.value = val.text
  showTypePicker.value = false
}

const onIsDadConfirm = val => {
  form.value.isDads = val.value
  isDadOptionName.value = val.text
  showIsDadPicker.value = false
}
const onIsDadRecommendConfirm = val => {
  form.value.isDadsRecommend = val.value
  isDadsRecommendOptionName.value = val.text
  showIsDadRecommendPicker.value = false
}
const onIsCloseConfirm = val => {
  form.value.isClosePermanently = val.value
  isClosePermanentlyOptionName.value = val.text
  showIsClosePicker.value = false
}

const handleImgUrl = val => {
  form.value.defaultImg = val
}

const submit = async() => {
  const { lon, lat } = form.value
  // 因為vant input type="number"還是輸出string，要自己轉
  form.value = { ...form.value, lon: parseFloat(lon), lat: parseFloat(lat) }

  if (props.mode === 'add') {
    const { code, message } = await CreateStore(form.value)
    if (code === 1) {
      Notify({ type: 'success', message })
    } else {
      Notify({ type: 'danger', message })
    }
  } else if (props.mode === 'edit') {
    const { code, message } = await UpdateStore(form.value.storeId, form.value)
    if (code === 1) {
      Notify({ type: 'success', message })
    } else {
      Notify({ type: 'danger', message })
    }
  }
  visible.value = false
  emit('submited')
}

onMounted(async() => {
  const { code: countyCode, data: countyData } = await getAllCounties()
  if (countyCode === 1) {
    countyList.value = countyData.map(item => {
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

  if (props.mode === 'edit') {
    const { code: districtCode, data: districtData } = await getAllDistricts()
    if (districtCode === 1) {
      districtList.value = districtData.map(item => {
        return {
          text: item.name,
          value: item.districtId
        }
      })
    }
    form.value.storeId = props.data.storeId
    form.value.storeName = props.data.storeName
    form.value.introduce = props.data.introduce
    form.value.countyId = props.data.countyId || null
    countyName.value = props.data.countyName
    districtName.value = props.data.districtName
    typeName.value = props.data.typeName
    form.value.districtId = props.data.districtId || null
    form.value.typeId = props.data.typeId || null
    form.value.address = props.data.address
    form.value.phone = props.data.phone
    form.value.mobile = props.data.mobile
    form.value.email = props.data.email
    form.value.webSite = props.data.webSite
    form.value.lon = props.data.lon || null
    form.value.lat = props.data.lat || null
    form.value.isDads = props.data.isDads
    form.value.isDadsRecommend = props.data.isDadsRecommend
    form.value.isClosePermanently = props.data.isClosePermanently
    form.value.defaultImg = props.data.defaultImg
    isDadOptionName.value = isDadsList.value.find(item => item.value === props.data.isDads).text
    isDadsRecommendOptionName.value = isDadsRecommendList.value.find(item => item.value === props.data.isDadsRecommend).text
    isClosePermanentlyOptionName.value = isClosePermanentlyList.value.find(item => item.value === props.data.isClosePermanently).text
    // form.value.defaultImg = props.data.defaultImg ? [{ url: props.data.defaultImg }] : []
    // form.value.img1 = props.data.img1 ? [{ url: props.data.img1 }] : []
    // form.value.img2 = props.data.img2 ? [{ url: props.data.img2 }] : []
  }
})

</script>

<style lang="stylus" scoped>
.edit
  box-sizing border-box
  width 100%
  height 1200px
  overflow-y scroll
  background-color #fff
  .upload-wrap
    display flex
    flex-direction column
    justify-content flex-start
    .defalut-img
      width 300px
      height 200px
      padding 10px
      // margin-right 10px
      object-fit cover
      border-radius 32px
  .btn-wrap
    box-sizing border-box
    width 100%
    padding 20px
    margin 20px 0
    display flex
    justify-content flex-end
    align-items center
    button
      width 160px
      margin-left 20px

</style>
