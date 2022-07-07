import router from '@/router'
import { useUserStore } from './store/user'

// import store from '@/store'

// 白名单(不需權限)，里面是路由对象的path
const whiteList = ['/login', '/404']

// vue-router4的路由守卫不再是通过next放行，而是通过return返回true或false或者一个路由地址
router.beforeEach(async to => {
  const userStore = useUserStore()
  // 在免登录白名单，直接进入
  if (whiteList.indexOf(to.path) !== -1) {
    return true
  }

  if (userStore?.userInfo?.id ?? '') {
    if (to.name === 'Login') {
      return { name: 'Home' }
    } else {
      return true
    }
  } else {
    if (to.name === 'Login') {
      return true
    }
    return {
      name: 'Login',
      replace: true
    }
  }
})
