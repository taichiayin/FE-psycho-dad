<template>
  <div class="fb-login-btn">
    <div
      class="fb-login-button"
      data-width=""
      data-size="large"
      data-button-type="continue_with"
      data-layout="default"
      data-auto-logout-link="false"
      data-use-continue-as="true"
    />
  </div>
  <div class="btn"
       @click="login"
  >
    login facebook
  </div>
  <div class="btn"
       @click="logout"
  >
    loguut facebook
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'Login'
}
</script>

<script setup>

const login = () => {
  window.FB.login(function(response) {
  // handle the response
    console.log(response)
  })
}

const logout = () => {
  window.FB.logout((response) => {
    console.log(response)
  })
}

onMounted(() => {
  window.FB.getLoginStatus(function(res) {
    console.log(res)
    if (res.status === 'connected') {
      // basic info
      window.FB.api('/me', function(userInfo) {

      })
    }
  })
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
