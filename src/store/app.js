import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      fontSize: 75,
      // 座標 lon:經度 lat:緯度
      coordinat: {
        lon: 0,
        lat: 0
      }
    }
  },
  actions: {
    SET_COORDINAT(payload) {
      this.coordinat = payload
    },
    SET_FONT_SIZE(fontSize) {
      this.fontSize = fontSize
    }
  },
  getters: {
    currentFontSize: state => state.fontSize * 0.5
  }
})
