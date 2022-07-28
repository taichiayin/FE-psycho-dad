<template>
  <n-button type="info" @click="fileInput.click()">{{ props.reload ? '重新上傳' :'上傳圖片' }}</n-button>
  <input
    ref="fileInput"
    type="file"
    style="display: none"
    accept="image/jpeg"
    @change="onChange"
  >
  <n-modal v-if="show" v-model:show="show">
    <Cropper
      :img-url="imgUrl"
      :img-name="imgName"
      @cropperCancel="cropperCancel"
      @cropperConfirm="cropperConfirm"
    />
  </n-modal>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { NModal, NButton } from 'naive-ui'
import Cropper from './Cropper.vue'

const props = defineProps({
  reload: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cropperConfirm'])

const fileInput = ref(null)
const imgUrl = ref(null)
const imgName = ref(null)
const show = ref(false)

const cropperCancel = () => {
  show.value = false
}

const cropperConfirm = val => {
  console.log(val)
  emit('cropperConfirm', val)
  show.value = false
}

const onChange = e => {
  const img = e.target.files[0]
  imgUrl.value = URL.createObjectURL(img)
  imgName.value = img.name
  show.value = true
}

</script>

<style lang="stylus" scoped>

</style>
