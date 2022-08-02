<template>
  <div class="cropper">
    <img id="image" ref="imageRef" :src="defaultImgUrl">
    <div class="btn-wrap">
      <van-button @click="cancel">取消</van-button>
      <van-button type="info" @click="confirm">裁切</van-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, ref, computed } from 'vue'
import { Notify } from 'vant'

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
  }
})

const emit = defineEmits(['cropperCancel', 'cropperConfirm'])

const defaultImgUrl = computed(() => {
  return import.meta.env.DEV ? props.imgUrl : `https://api.taixchi8.com${props.imgUrl}`
})

const imageRef = ref(null)
let cropper

const cancel = () => {
  emit('cropperCancel')
}

const confirm = async() => {
  cropper.getCroppedCanvas().toBlob(async blob => {
    const formData = new FormData()
    formData.append('file', blob, 'defaultImg.jpeg')
    const { code, message, data } = await upload(formData)
    if (code !== 1) {
      Notify({ type: 'danger', message })
      return
    }
    Notify({ type: 'success', message })
    emit('cropperConfirm', data[0].Url)
  }, 'image/jpeg')
}

const initCropper = () => {
  cropper = new Cropper(imageRef.value, {
    viewMode: 1,
    cropBoxResizable: false,
    dragMode: 'move',
    aspectRatio: 300 / 200

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
    margin-top 20px
    display flex
    justify-content center
    align-items center
    .n-button
      padding 40px
      margin 20px

</style>
