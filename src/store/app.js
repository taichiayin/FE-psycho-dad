import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
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
    }

  }
})
