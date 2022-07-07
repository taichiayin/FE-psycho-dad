<template>
  <div class="store-container">
    <div class="default-img" :style="{ 'background-image': 'url(' + props.defaultImg + ')' }" />
    <div class="name" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})

</script>

<style lang="stylus" scoped>

</style>
