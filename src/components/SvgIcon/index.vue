<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const symbolId = computed(() => `#icon-${props.name}`)
    return { symbolId }
  }
})
</script>

<style lang="stylus" scoped>
.icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden

</style>
