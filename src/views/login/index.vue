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
import { validateFbToken } from '@/api/login.js'

const user = useUserStore()
const router = useRouter()
const url = ref('')

const goValidateFBToken = async response => {
  const { code, data } = await validateFbToken({ accessToken: response.authResponse.accessToken })
  if (code === 1) {
    const info = {
      id: data.id,
      name: data.name,
      email: data?.email ?? '',
      avatar: data?.picture?.data?.url ?? ''
    }
    user.setInfo(info)
    router.replace({ name: 'Home' })
  }
}

const login = () => {
  window.FB.login(function(response) {
    goValidateFBToken(response)
  }, { scope: 'public_profile,email' })
}

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
