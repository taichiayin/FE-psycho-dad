<template>
  <div class="ensure-background-image-element" :style="localStyle">
    <slot />
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: () => ''
  },
  defaultSrc: {
    type: String,
    default: () => ''
  }
})

const emit = defineEmits(['checked'])

const localSrc = ref('')

const localStyle = computed(() => {
  return localSrc.value
    ? {
      backgroundImage: `url(${localSrc.value})`
    }
    : ''
})

const checkImage = () => {
  const img = document.createElement('img')
  img.onload = () => {
    const newSrcUrl = encodeURI(props.src).replace(/['(']/g, '%28').replace(/[')']/g, '%29')
    localSrc.value = newSrcUrl
    emit('checked', true)
  }
  img.onerror = () => {
    localSrc.value = props.defaultSrc
    emit('checked', false)
  }
  // 若 this.src 沒值，拿 this.defaultSrc，反之拿 this.src
  img.src = props.src === ' ' ? props.defaultSrc : props.src
}

watch(() => props.src, () => {
  checkImage()
}, {
  immediate: true
})

</script>
