<template>
  <input type="file" accept="image/jpeg" @change="onChange">
  <n-modal v-if="show" v-model:show="show">
    <Cropper
      :img-url="imgUrl"
      :img-name="imgName"
      :store-id="props?.storeId"
      @cropperCancel="cropperCancel"
      @cropperConfirm="cropperConfirm"
    />
  </n-modal>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { NModal } from 'naive-ui'
import Cropper from './Cropper.vue'

const props = defineProps({
  storeId: {
    type: Number,
    default: 0
  }
})

const imgUrl = ref(null)
const imgName = ref(null)
const show = ref(false)

const cropperCancel = () => {
  show.value = false
}

const cropperConfirm = () => {
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
