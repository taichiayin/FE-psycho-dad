<template>
  <div class="ensure-background-image-element" :style="localStyle">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EnsureBackgroundImage',
  props: {
    src: {
      type: String,
      default: () => ''
    },
    defaultSrc: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      localSrc: ''
    }
  },
  computed: {
    localStyle() {
      return this.localSrc
        ? {
          backgroundImage: `url(${this.localSrc})`
        }
        : ''
    }
  },
  watch: {
    src() {
      this.checkImage()
    }
  },
  mounted() {
    this.checkImage()
  },
  methods: {
    checkImage() {
      const img = document.createElement('img')
      img.onload = () => {
        const newSrcUrl = encodeURI(this.src).replace(/['(']/g, '%28').replace(/[')']/g, '%29')
        this.localSrc = newSrcUrl
        this.$emit('checked', true)
      }
      img.onerror = () => {
        this.localSrc = this.defaultSrc
        this.$emit('checked', false)
      }
      // 若 this.src 沒值，拿 this.defaultSrc，反之拿 this.src
      img.src = this.src === ' ' ? this.defaultSrc : this.src
    }
  }
}
</script>
