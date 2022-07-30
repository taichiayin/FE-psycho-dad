<template>
  <div class="edit">
    <div class="header">
      <SvgIcon class="arrow-left" name="arrow-left" @click="goBack" />
      <div class="title">
        編輯模式
      </div>
    </div>

    <div
      v-for="(item, index) in storeList"
      :key="index"
      class="store-box"
      @click="onStoreClick(item)"
    >
      {{ item.storeName }}
    </div>
    <div class="add" @click="onAddClick">
      <SvgIcon name="plus" />
    </div>
  </div>
  <EditModal
    v-if="show"
    v-model:value="show"
    :data="data"
    :mode="mode"
    @submited="onSubmited"
  />
</template>

<script>
export default { name: 'Edit' }
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getStoresForEdit } from '@/api/stores.js'
import EditModal from './components/EditModal.vue'

const router = useRouter()
const storeList = ref([])
const show = ref(false)
const data = ref(null)
const mode = ref('query')

const init = async() => {
  const { code, data } = await getStoresForEdit()
  if (code === 1) {
    storeList.value = data
  }
}

const goBack = () => {
  router.replace({ name: 'Home' })
}

const onStoreClick = item => {
  data.value = item
  mode.value = 'edit'
  show.value = true
}

const onAddClick = () => {
  mode.value = 'add'
  show.value = true
}

const onSubmited = () => {
  init()
}

onMounted(() => {
  init()
})

</script>

<style lang="stylus" scoped>
.edit
  box-sizing border-box
  width 100%
  padding 20px
  display flex
  flex-direction column
  justify-content center
  align-items flex-start
  .header
    width 100%
    margin-bottom 20px
    display flex
    justify-content flex-start
    align-items center
    .arrow-left
      font-size 64px
      margin-right 20px
    .title
      width auto
      padding 20px
      font-size 36px
      font-weight bold
      color #ff7675
      border-radius 16px
      background-color #fff
  .store-box
    box-sizing border-box
    width 100%
    padding 20px
    margin-bottom 10px
    border-radius 88px
    background-color #666
  .add
    position fixed
    width 80px
    height 80px
    bottom 60px
    right 60px
    display flex
    justify-content center
    align-items center
    font-size 56px
    color #fff
    border-radius 50%
    background-color #d63031

</style>
