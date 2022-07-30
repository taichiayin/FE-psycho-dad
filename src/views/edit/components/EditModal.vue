<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    :auto-focus="false"
    :mask-closable="false"
    :show-icon="false"
    :bordered="false"
    title="詳情"
  >
    <div class="edit">
      <n-form
        ref="formRef"
        class="form"
        :model="form"
        :show-label="false"
        size="small"
      >
        <n-form-item path="storeName" label="">
          <n-input v-model:value="form.storeName" placeholder="名稱" />
        </n-form-item>
        <n-form-item path="countyId" label="">
          <n-select
            v-model:value="form.countyId"
            size="small"
            label-field="name"
            value-field="countyId"
            filterable
            :options="countyList"
            placeholder="縣市"
            @update:value="handleCountyUpdate"
          />
        </n-form-item>
        <n-form-item path="districtId" label="">
          <n-select
            v-model:value="form.districtId"
            size="small"
            :options="districtList"
            label-field="name"
            value-field="districtId"
            filterable
            placeholder="鄉鎮區"
          />
        </n-form-item>
        <n-form-item path="typeId" label="">
          <n-select
            v-model:value="form.typeId"
            size="small"
            :options="typeList"
            filterable
            label-field="name"
            value-field="typeId"
            placeholder="類型"
          />
        </n-form-item>
        <n-form-item path="introduce" label="">
          <n-input
            v-model:value="form.introduce"
            type="textarea"
            :maxlength="500"
            show-count
            placeholder="介紹"
          />
        </n-form-item>
        <n-form-item path="address" label="">
          <n-input v-model:value="form.address" placeholder="地址" />
        </n-form-item>
        <n-form-item path="phone" label="">
          <n-input v-model:value="form.phone" placeholder="手機" />
        </n-form-item>
        <n-form-item path="mobile" label="">
          <n-input v-model:value="form.mobile" placeholder="電話" />
        </n-form-item>
        <n-form-item path="webSite" label="">
          <n-input v-model:value="form.webSite" placeholder="網站" />
        </n-form-item>
        <n-form-item path="email" label="">
          <n-input v-model:value="form.email" placeholder="電子信箱" />
        </n-form-item>
        <n-form-item path="" label="">
          <img
            v-if="form.defaultImg"
            class="defalut-img"
            :src="form.defaultImg"
            alt=""
          >
          <UploadImage :reload="!!form.defaultImg" @cropperConfirm="handleImgUrl" />
          <!-- <UploadImage :store-id="props.data.storeId" :default-img="props.data.defaultImg" @updateImgList="updateImgList" /> -->
        </n-form-item>
        <n-form-item path="lon" label="">
          <n-input-group>
            <n-input-number
              v-model:value="form.lon"
              :show-button="false"
              :max="180"
              placeholder="經度 數值: 0-180"
            />
            <n-input-group-label size="small">經度</n-input-group-label>
          </n-input-group>
        </n-form-item>
        <n-form-item path="lat" label="">
          <n-input-group>
            <n-input-number
              v-model:value="form.lat"
              :show-button="false"
              :max="90"
              placeholder="緯度 數值: 0-90"
            />
            <n-input-group-label size="small">緯度</n-input-group-label>
          </n-input-group>
        </n-form-item>
        <n-form-item path="isDads" label="">
          <n-select
            v-model:value="form.isDads"
            size="small"
            :options="isDadsList"
            placeholder="大叔的店"
          />
        </n-form-item>
        <n-form-item path="isDadsRecommend" label="">
          <n-select
            v-model:value="form.isDadsRecommend"
            size="small"
            :options="isDadsRecommendList"
            placeholder="大叔推薦"
          />
        </n-form-item>
        <n-form-item path="isClosePermanently" label="">
          <n-select
            v-model:value="form.isClosePermanently"
            size="small"
            :options="isClosePermanentlyList"
            placeholder="是否歇業"
          />
        </n-form-item>
      </n-form>
      <div class="btn-wrap">
        <n-button round type="default" @click="visible = false">取消</n-button>
        <n-button round type="info" @click="submit">送出</n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, NSelect, NInputNumber, NInputGroup, NInputGroupLabel } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { getAllCounties } from '@/api/counties.js'
import { getAllDistricts } from '@/api/districts.js'
import { getAllTypes } from '@/api/types.js'
import { CreateStore, UpdateStore } from '@/api/stores.js'
import UploadImage from '@/components/UploadImage/index.vue'

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
window.$Nmessage = useMessage()
const form = ref({
  countyId: null,
  dis: null,
  imgList: null,
  defaultImg: ''
})
const countyList = ref([])
const districtList = ref([])
const typeList = ref([])
const isDadsList = ref([
  { label: '是，大叔開的店', value: true },
  { label: '否，不是大叔開的店', value: false }
])
const isDadsRecommendList = ref([
  { label: '是，大叔推薦的店', value: true },
  { label: '否，不是大叔推薦的店', value: false }
])
const isClosePermanentlyList = ref([
  { label: '已歇業', value: true },
  { label: '正常營業中', value: false }
])

const visible = computed({
  get: () => props.value,
  set: val => emit('update:value', val)
})

const handleCountyUpdate = async val => {
  form.value.districtId = null
  const { code: districtCode, data: districtData } = await getAllDistricts({ countyId: val })
  if (districtCode === 1) {
    districtList.value = districtData
  }
}

const handleImgUrl = val => {
  form.value.defaultImg = val
}

// const updateImgList = data => {
//   form.value.defaultImg = data[0].url
// }

const submit = async() => {
  if (props.mode === 'add') {
    const { code, message } = await CreateStore(form.value)
    if (code === 1) {
      window.$Nmessage.success(message)
    } else {
      window.$Nmessage.error(message)
    }
  } else if (props.mode === 'edit') {
    const { code, message } = await UpdateStore(form.value.storeId, form.value)
    if (code === 1) {
      window.$Nmessage.success(message)
    } else {
      window.$Nmessage.error(message)
    }
  }
  visible.value = false
  emit('submited')
}

onMounted(async() => {
  const { code: countyCode, data: countyData } = await getAllCounties()
  if (countyCode === 1) {
    countyList.value = countyData
  }

  const { code: typeCode, data: typeData } = await getAllTypes()
  if (typeCode === 1) {
    typeList.value = typeData
  }

  if (props.mode === 'edit') {
    const { code: districtCode, data: districtData } = await getAllDistricts()
    if (districtCode === 1) {
      districtList.value = districtData
    }
    form.value.storeId = props.data.storeId
    form.value.storeName = props.data.storeName
    form.value.introduce = props.data.introduce
    form.value.countyId = props.data.countyId || null
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
  .defalut-img
    width 400px
    height 200px
    object-fit contain
    margin-right 10px
  .btn-wrap
    width 100%
    display flex
    justify-content flex-end
    align-items center
    button
      margin-left 20px

:deep(.n-form-item-feedback-wrapper)
  min-height 20px

</style>
