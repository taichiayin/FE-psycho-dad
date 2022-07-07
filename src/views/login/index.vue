<template>
  <div class="login">
    <div class="logo" />
    <div class="btn" @click="login">
      LOGIN WITH FACEBOOK
    </div>
    <!-- <div
      class="btn"
      @click="logout"
    >
      loguut facebook
    </div> -->
    <img
      :src="url"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const url = ref('')

const login = () => {
  window.FB.login(function(response) {
    const { status } = response
    // 判斷是否登入
    if (status === 'connected') {
      window.FB.api('/me', {
        'fields': 'id,name,email,picture'
      }, function(me) {
        if (!me.id) {
          return
        }
        const info = {
          id: me.id,
          name: me.name,
          email: me?.email ?? '',
          avatar: me?.picture?.data?.url ?? ''
        }
        user.setInfo(info)
        console.log(me)
        router.replace({ name: 'Home' })
      })
    }
  }, { scope: 'public_profile,email' })
}

// const logout = () => {
//   window.FB.logout((response) => {
//     console.log(response)
//   })
// }

onMounted(() => {
  window.FB.getLoginStatus(function(res) {
    const { status } = res
    if (status === 'connected') {
      window.FB.api('/me', {
        'fields': 'id,name,email,picture'
      }, function(me) {
        if (!me.id) {
          return
        }
        const info = {
          id: me.id,
          name: me.name,
          email: me?.email ?? '',
          avatar: me?.picture?.data?.url ?? ''
        }
        user.setInfo(info)
        console.log(me)
        router.replace({ name: 'Home' })
      })
    }
  })
})

</script>

<style lang="stylus" scoped>
.login
  width 100%
  padding-top 200px
  display flex
  flex-direction: column
  justify-content center
  align-items center
  .logo
    width 200px
    height 200px
    border-radius 50%
    background-repeat no-repeat
    background-size cover
    background-position center
    background-image url("../../assets/imgs/logo.png")
.btn
  width 240px
  margin-top 20px
  padding 10px
  color rgba(255,255,255,.7)
  text-align center
  border-radius 8px
  background-color rgb(24, 119, 242)
.fb-login-btn
  width 80%
</style>
