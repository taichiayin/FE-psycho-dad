// 须要在希望 Mixin 的 component 上面加上 data: { resizeOptions: { selector: '.xxx', showFooter: true, showHeader: true } }
// 其中， resizeOptions.selector 代表想要设定高度的节点上的 query 目标（id, class, tag...）

import { useAppStore } from '@/store/app.js'

import { rootValue } from '@/utils/helper'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export default function(resizeOptions, headerHeight = 0) {
  const app = useAppStore()
  const currentPageHeight = ref(0)
  const currentFontSize = computed(() => {
    return app.fontSize
  })

  onMounted(() => {
    window.addEventListener('resize', setHeight, true)
    setHeight(resizeOptions, headerHeight)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setHeight, true)
  })

  const setHeight = (resizeOptions, headerHeight) => {
    const els = [...document.querySelectorAll(resizeOptions.selector)]
    els.forEach(el => {
      let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      // 扣掉 Header height
      if (resizeOptions.showHeader) vh -= ((resizeOptions.headerHeight || headerHeight || 88) * (currentFontSize.value / rootValue))
      // 扣掉 Footer height
      if (resizeOptions.showFooter) vh -= ((resizeOptions.footerHeight || 120) * (currentFontSize.value / rootValue))
      const heightRem = vh / currentFontSize.value
      const attr = resizeOptions.attr || 'height'
      el.setAttribute('style', resizeOptions.unit === 'rem' ? `${attr}: ${heightRem}rem;` : `${attr}: ${vh}px;`)
      currentPageHeight.value = vh
    })
  }

  return {
    currentPageHeight
  }

  // data() {
  //   return {
  //     currentPageHeight: 0
  //   }
  // },
  // mounted() {
  //   window.addEventListener('resize', this.setHeight, true)
  //   this.setHeight()
  // },
  // destroyed() {
  //   window.removeEventListener('resize', this.setHeight, true)
  // },
  // computed: {
  //   ...mapState({
  //     currentFontSize: state => state.app.fontSize
  //   })
  // },
  // methods: {
  //   setHeight() {
  //     // const isVertical = (window.orientation === 0 || window.orientation === 180)
  //     const els = [...document.querySelectorAll(this.resizeOptions.selector)]
  //     els.forEach(el => {
  //       let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  //       // 扣掉 Header height
  //       if (this.resizeOptions.showHeader) vh -= ((this.resizeOptions.headerHeight || this.headerHeight || 88) * (this.currentFontSize / rootValue))
  //       // 扣掉 Footer height
  //       if (this.resizeOptions.showFooter) vh -= ((this.resizeOptions.footerHeight || 120) * (this.currentFontSize / rootValue))
  //       const heightRem = vh / this.currentFontSize
  //       const attr = this.resizeOptions.attr || 'height'
  //       el.setAttribute('style', this.resizeOptions.unit === 'rem' ? `${attr}: ${heightRem}rem;` : `${attr}: ${vh}px;`)
  //       this.currentPageHeight = vh
  //     })
  //   }
  // }
}
