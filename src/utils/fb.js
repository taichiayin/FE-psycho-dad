// import { useFbStore } from '@/store/fb.js'

// const fbStore = useFbStore()

export const initFacebook = () => {
  // 防止重複載入
  if (!window.FB) {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '603757541009890', // 填入自己 app 的 id
        cookie: true,
        xfbml: true,
        version: 'v14.0' // 目前版本
      })
    };

    (function(d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/zh_TW/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }
}

