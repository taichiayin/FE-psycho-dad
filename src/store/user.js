import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  actions: {
    setInfo(info) {
      this.userInfo = info
      localStorage.setItem('userInfo', JSON.stringify(info))
    },
    setName(name) {
      this.userInfo.name = name
    },
    setAvatar(url) {
      this.userInfo.avatar = url
    },
    setId(id) {
      this.userInfo.id = id
    },
    setEmail(email) {
      this.userInfo.email = email
    },
    clearInfo() {
      this.userInfo = {}
      localStorage.clear()
    }
  }
})
