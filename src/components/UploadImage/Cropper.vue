<template>
  <div class="cropper">
    <img id="image" ref="imageRef" :src="props.imgUrl">
    <div class="btn-wrap">
      <n-button @click="cancel">取消</n-button>
      <n-button type="info" @click="confirm">裁切</n-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'

import { upload } from '@/api/upload.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const props = defineProps({
  imgUrl: {
    type: String,
    default: ''
  },
  imgName: {
    type: String,
    default: ''
  },
  storeId: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['cropperCancel', 'cropperConfirm'])

const nMessage = useMessage()
const imageRef = ref(null)
let cropper

const cancel = () => {
  emit('cropperCancel')
}

const confirm = async() => {
  cropper.getCroppedCanvas().toBlob(async blob => {
    const formData = new FormData()
    formData.append('fileName', 'defaultImg.jpeg')
    formData.append('storeId', props.storeId)
    formData.append('file', blob)
    const { code, message } = await upload(formData)
    if (code !== 1) {
      nMessage.error(message)
      return
    }
    nMessage.success(message)
  }, 'image/jpeg')

  emit('cropperConfirm')
}

const initCropper = () => {
  cropper = new Cropper(imageRef.value, {
    viewMode: 1,
    cropBoxResizable: false,
    dragMode: 'move',
    aspectRatio: 300 / 100

  })
}

onMounted(() => {
  if (cropper) {
    cropper.destroy()
    initCropper()
  } else {
    initCropper()
  }

  // console.log(cropper)
})

</script>

<style lang="stylus" scoped>
.cropper
  background-color #fff
  img
    display block
    max-width 100%
  .btn-wrap
    margin-top 10px
    display flex
    justify-content center
    align-items center
    .n-button
      padding 20px
      margin 10px

</style>
