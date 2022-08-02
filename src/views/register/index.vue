<template>
  <div class="register">
    <div class="title">Sign up</div>
    <SvgIcon class="icon-arrow-left" name="arrow-left" />
    <div class="wrap">
      <van-form ref="refForm" label-width="60px">
        <van-field
          v-model="form.username"
          name="username"
          label="帳號"
          placeholder="請填寫帳號"
          :rules="[{ required: true, message: '請填寫帳號' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="密碼"
          placeholder="請填寫密碼"
          :rules="[{ required: true, message: '請填寫密碼' }]"
        />
      </van-form>
    </div>
    <div class="btn-register" @click="onSubmit">註冊</div>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<script setup>
import { ref } from 'vue'
import { register } from '@/api/users'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
const refForm = ref(null)
const form = ref({
  username: '',
  password: ''
})

const onSubmit = () => {
  refForm.value.validate().then(async() => {
    const { code, message } = await register(form.value)
    if (code === 1) {
      Notify({ type: 'success', message: '註冊成功' })
      router.replace({ name: 'Login' })
    } else {
      Notify({ type: 'danger', message })
    }
  }).catch(() => {
    Notify({ type: 'danger', message: '資料填寫錯誤！' })
  })
}

</script>

<style lang="stylus" scoped>
.register
  position relative
  width 100%
  min-height 100vh
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-image linear-gradient(-45deg, #34495E, #577a9e)
  .icon-arrow-left
    position absolute
    font-size 100px
    top 40px
    left 40px
  .title
    position absolute
    top 300px
    left 40px
    font-size 100px
  .wrap
    .van-cell
      background-color transparent
      :deep(.van-cell__title)
        color #fff
        font-size 32px
      :deep(.van-cell__value)
        color #fff
        font-size 32px
      :deep(input)
        color #fff
  .btn-register
    width 80%
    margin-top 40px
    padding 20px
    border-radius 50px
    background-color #577a9e
    text-align center
    font-size 48px
    color rgba(255,255,255,.7)
    letter-spacing 3px

</style>
