<template>
  <div class="login">
    <form class="login-form" action="">
      <div class="txt-box">
        <input
          v-model="form.username"
          type="text"
          @focus="onFocus"
          @blur="onBlur"
        >
        <span data-placeholder="Username" />
      </div>
      <div class="txt-box">
        <input
          v-model="form.password"
          type="password"
          @focus="onFocus"
          @blur="onBlur"
        >
        <span data-placeholder="Password" />
      </div>

      <div class="submit" @click="submit">Login</div>
      <div class="other-opt">
        <div class="opt-box signup" @click="goRegister">Sign up</div>
        <div class="opt-box forget">Forget Password</div>
      </div>
      <div class="fblogin" @click="fbSubmit">
        <div class="logo">
          <SvgIcon class="fb-brands" name="fb-brands" />
        </div>
        <div class="text">
          LOGIN with FACEBOOK
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<script setup>
import { ref } from 'vue'
import { login, fbLogin } from '@/api/login.js'
import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const form = ref({
  username: null,
  password: null
})
// const inputTriger = ref(false)

const onFocus = e => {
  e.target.className = 'focus'
}

const onBlur = e => {
  if (e.target.value) {
    e.target.className = 'focus'
  } else {
    e.target.className = ''
  }
}

const goRegister = () => {
  router.push({ name: 'Register' })
}

const submit = async() => {
  const { code, data } = await login({ username: form.value.username, password: form.value.password })
  if (code === 1) {
    user.setInfo(data)
    router.replace({ name: 'Home' })
  }
}

const fbSubmit = () => {
  window.FB.login(function(res) {
    console.log(res)
    if (res.status === 'connected') {
      window.FB.api('/me', {
        'fields': 'id,name,email,picture'
      }, async function(me) {
        const payload = {
          id: me.id,
          name: me.name,
          email: me.email,
          avatarUrl: me?.picture?.data?.url ?? ''
        }
        const { code, data } = await fbLogin(payload)
        if (code === 1) {
          data.avatar = me?.picture?.data?.url ?? ''
          data.email = me.email
          user.setInfo(data)
          router.replace({ name: 'Home' })
        }
      })
    }
  })
}

// import { useUserStore } from '@/store/user.js'
// import { useRouter } from 'vue-router'
// import { validateFbToken } from '@/api/login.js'

// const user = useUserStore()
// const router = useRouter()

// const goValidateFBToken = async response => {
//   const { code, data } = await validateFbToken({ accessToken: response.authResponse.accessToken })
//   if (code === 1) {
//     const info = {
//       id: data.id,
//       name: data.name,
//       email: data?.email ?? '',
//       avatar: data?.picture?.data?.url ?? ''
//     }
//     user.setInfo(info)
//     router.replace({ name: 'Home' })
//   }
// }

// const login = () => {
//   window.FB.login(function(response) {
//     goValidateFBToken(response)
//   }, { scope: 'public_profile,email' })
// }

// onMounted(() => {
//   window.FB.getLoginStatus(function(res) {
//     const { status } = res
//     if (status === 'connected') {
//       window.FB.api('/me', {
//         'fields': 'id,name,email,picture'
//       }, function(me) {
//         if (!me.id) {
//           return
//         }
//         const info = {
//           id: me.id,
//           name: me.name,
//           email: me?.email ?? '',
//           avatar: me?.picture?.data?.url ?? ''
//         }
//         user.setInfo(info)
//         router.replace({ name: 'Home' })
//       })
//     }
//   })
// })

</script>

<style lang="stylus" scoped>
.login
  position relative
  width 100%
  min-height 100vh
  background-image linear-gradient(0deg, #34495E, #577a9e)

  .login-form
    width 80%
    padding 40px
    border-radius 32px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    h1
      font-size 72px
      font-weight bold
      text-align center
      margin-bottom 60px
      font-family PingFangSC-Regular
    .txt-box
      position relative
      border-bottom 4px solid #dfe6e9
      margin 60px 0
      input
        width 100%
        height 80px
        font-size 36px
        color #636e72
        background none
        padding 0 10px
        font-family PingFangSC-Regular
        color #fff
        &.focus + span:before
          top -10px

        &.focus + span:after
          width 100%
      span
        font-family PingFangSC-Regular
        font-size 40px
        letter-spacing 2.4px
        &:before
          content attr(data-placeholder)
          position absolute
          top 50%
          left 10px
          color #dfe6e9
          transform translateY(-50%)
          z-index -1
          transition .5s
        &:after
          content ''
          position absolute
          width 0
          height 4px
          background #b2bec3
          transition .5s
    .submit
      width 100%
      height 80px
      margin-bottom 40px
      font-size 48px
      letter-spacing 2.4px
      font-weight bold
      line-height 80px
      border-radius 40px
      text-align center
      background-color #577a9e
    .other-opt
      width 100%
      height 40px
      margin-bottom 40px
      display flex
      justify-content center
      align-items center
      .opt-box
        line-height 40px
        padding 0 40px
        font-weight bold
        &.signup
          position relative
          &:after
            content ''
            position absolute
            width 4px
            height 40px
            top 0
            right 0
            background-color rgba(255,255,255,.7)
    .fblogin
      position relative
      width 100%
      height 80px
      display flex
      justify-content center
      align-items center
      border-radius 80px
      background-color #1877F2
      .logo
        position absolute
        width 80px
        height 80px
        display flex
        justify-content center
        align-items center
        top 0
        left 0
        border-radius 80px
        background-color rgba(255,255,255,.9)
        .fb-brands
          width 60px
          height 60px
          color #1877f2
      .text
        color rgba(255,255,255,.7)
        font-weight bold
</style>
