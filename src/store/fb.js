import { defineStore } from 'pinia'

export const useFbStore = defineStore('fb', {
  state: () => {
    return {
      FB: null
    }
  },
  actions: {
    setFB(payload) {
      this.FB = payload
    }
  }
})
