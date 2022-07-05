<template>
  <div
    class="btn"
    @click="login"
  >
    login facebook
  </div>
  <div
    class="btn"
    @click="logout"
  >
    loguut facebook
  </div>
  <img
    :src="url"
    alt=""
  >
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
export default {
  name: 'Login'
}
</script>

<script setup>

const url = ref('')
const login = () => {
  window.FB.login(function(response) {
  // handle the response
    const { authResponse, status } = response
    if (status === 'connected') {
      window.FB.api('/me', function(userInfo) {
        console.log(userInfo)
        window.FB.api(
          `/${userInfo.id}/picture`,
          'GET',
          { 'redirect': 'false' },
          function(res) {
            // Insert your code here
            console.log(res)
            url.value = res.data.url
          }
        )
      })
    }
  }, { scope: 'public_profile,email' })
}

const logout = () => {
  window.FB.logout((response) => {
    console.log(response)
  })
}

onMounted(() => {
  // window.FB.getLoginStatus(function(res) {
  //   console.log(res)
  //   const { authResponse, status } = res

  //   if (status === 'connected') {
  //     // basic info
  //     window.FB.api('/me', function(userInfo) {
  //     })
  //     // groups
  //     // window.FB.api(`/${authResponse.userID}/groups?access_token=${authResponse.accessToken}`, res => {
  //     //   console.log(res)
  //     // })
  //   }
  // })
})

</script>

<style lang="stylus" scoped>
.btn
  width 80%
  padding 10px
  color rgba(255,255,255,.6)
.fb-login-btn
  width 80%
</style>
