import { useAppStore } from '@/store/app.js'

export const resize = () => {
  const app = useAppStore()
  // 都用画面最小的长或宽，还做fontsize 基础
  let screenMin, fontSize
  const status = window.orientation === undefined
  if (status) {
    fontSize = window.innerWidth / 3.75
  } else {
    const orientation = window.orientation
    if (orientation === 0 || window.orientation === 180) {
      screenMin = window.innerWidth
    } else {
      screenMin = window.innerHeight
    }
    fontSize = screenMin / 3.75
  }
  // if (ww > screenMin) {
  //   // console.log('Adjust screen')
  //   window.requestAnimationFrame(resize)
  //   return
  // }
  app.SET_FONT_SIZE(fontSize)
  document.documentElement.style.fontSize = fontSize + 'px'
}

export function attachAutoResize() {
  resize()

  window.addEventListener('resize', resize)
  window.addEventListener('pageshow', function(e) {
    if (e.presisted) {
      resize()
    }
  })

  // window.onorientationchange = function() {
  //   resize()
  //   console.log('the orientation of the device is now ' + screen.orientation.angle)
  // }
}
