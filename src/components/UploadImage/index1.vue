<template>
  <div class="upload-image">
    <n-upload
      :file-list="fileList"
      :max="1"
      accept="image/jpeg"
      list-type="image-card"
      @change="handleUploadChange"
      @remove="handleUploadRemove"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { NUpload, useMessage } from 'naive-ui'
import { upload } from '@/api/upload.js'

window.$Nmessage = useMessage()

const props = defineProps({
  storeId: {
    type: Number,
    default: 0
  },
  defaultImg: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['updateImgList'])

const fileList = ref([])

const handleUploadChange = async({ file, event }) => {
  if (!event) return
  const formData = new FormData()
  formData.append('file', file.file)
  formData.append('fileName', 'defaultImg')
  formData.append('storeId', props.storeId)
  const { code, data, message } = await upload(formData)
  if (code !== 1) {
    window.$Nmessage.error(message)
    return
  }
  window.$Nmessage.success(message)
  fileList.value.push({ status: 'finished', url: data[0].Url })
  emit('updateImgList', fileList.value)
}

const handleUploadRemove = ({ file }) => {
  fileList.value.pop()
  // const idx = fileList.value.findIndex(el => el.name === file.name)
  // fileList.value.splice(idx, 1)
  emit('updateImgList', fileList.value)
}

onMounted(() => {
  fileList.value.push({ status: 'finished', url: props.defaultImg })
})

</script>

<style lang="stylus" scoped>
.upload-image
  width 100%
</style>
