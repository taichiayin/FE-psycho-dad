import axios from 'axios'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
const user = useUserStore()
const router = useRouter()
// import store from '@/store'
// import md5 from 'blueimp-md5'
// import { osVersion, osName, mobileModel } from 'mobile-device-detect'
// import { GetDeviceId } from '@/utils/fingerprintDeviceId'
// import {
//   handleSeverErrors,
//   skipGlobalError,
//   handleGlobalErrors,
//   handleTimeoutError,
//   globalErrorCache
// } from './handleAppErrors'
// import ErrorResponseType from '@/utils/errorResponseType'

/**
 * create an axios instance
 */
const service = axios.create({
  baseURL: '', // api 的 base_url
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * request interceptor
 */
service.interceptors.request.use(
  config => {
    const accessToken = user?.userInfo?.token || localStorage.getItem('userInfo')?.token || ''
    // const uid = store.getters['login/uid']
    // console.log('interceptors config accessToken', accessToken)
    // accessToken && (config.headers.Authorization = `Bearer ${accessToken}`)
    accessToken && (config.headers.token = accessToken)
    // uid && (config.headers.uid = store.getters['login/uid'])
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

/**
 * response interceptor
 */
service.interceptors.response.use(
  response => {
    const { code } = response.data
    // const { errorTypes } = response.config
    // const errorHandle = errorTypes.find(errorType => code === errorType.code)

    // 是否統一處理所有的code
    // const isExistsAll = errorTypes.find(errorType => errorType.code === 'all')

    // if (errorHandle || isExistsAll) {
    //   /**
    //    * 防止同类型错误併发的拦截
    //    */
    //   if (skipGlobalError(code)) return
    //   globalErrorCache.push({ code, message })

    //   // 全部的code統一走到自定義錯誤訊息
    //   if (code !== 405 && code !== 408 && isExistsAll) {
    //     const hintErrorHandle = { type: isExistsAll.type }
    //     return handleGlobalErrors(hintErrorHandle, message, null, response.data)
    //   }

    //   return handleGlobalErrors(errorHandle, message, null, response.data)
    // }
    console.log(code)
    if (code === 2099) {
      user.clearInfo()
      router.replace({ name: 'Login' })
      return
    }

    // if (code !== 1) {
    //   const hintErrorHandle = { type: ErrorResponseType.HINT, message }
    //   return handleGlobalErrors(hintErrorHandle, message, null, response.data)
    // }

    return response.data
  },
  error => {
    console.log('error', error)
    /**
     * 不明错误，EX: axios-timeout error
     */
    // if (!error.response) {
    //   if (error.request) {
    //     /**
    //      * Timeout error(且添加防止同类型错误併发的拦截)
    //      */
    //     if (skipGlobalError(error.code)) return
    //     globalErrorCache.push({ code: error.code })
    //     if (error.code === 'ECONNABORTED') {
    //       const { timeoutHandle } = error.config
    //       if (handleTimeoutError(timeoutHandle)) {
    //         return Promise.reject(error)
    //       }
    //     }
    //   } else {
    //     console.log('Error', error.message)
    //   }
    //   return Promise.reject(error)
    // }

    /**
     * 盖板系列错误
     */
    // const { status } = error.response
    // if (handleSeverErrors(status)) {
    //   // console.log('predictedStatus code', predictedStatus)
    //   return Promise.reject(error)
    // }

    /**
     * 防堵放行的状态码
     */
    // if (!(error.response && error.response.data && error.response.data.error)) {
    //   console.log('error.response', error.response)
    //   return Promise.reject(error)
    // }

    /**
     * 防止同类型错误併发的拦截
     */
    // const { code, message } = error.response.data.error
    // if (skipGlobalError(code)) return
    // globalErrorCache.push({ code, message })

    /**
     * 处理各类弹窗与客制化错误
     */
    // const { errorTypes } = error.response.config
    // const errorHandle = errorTypes.find(errorType => code === errorType.code)
    // return handleGlobalErrors(errorHandle, message, error, null)
  }
)

export async function _addSign() {
  const timestamp = Date.parse(new Date())
  const signParams = {}

  // try {
  //   signParams.device_id = await GetDeviceId()
  // } catch (error) {
  //   console.error(error)
  // }
  // signParams.os_type = store.state.app.osType || '1' // 1: h5, 2: android, 3: ios
  signParams.timestamp = timestamp
  // signParams.version = process.env.VERSION
  // const urlStr = urlEncode(signParams).substr(1)
  // signParams.sign = md5(urlStr + process.env.VUE_APP_API_SIGN)
  // signParams.device_os = osVersion
  // signParams.device_name = mobileModel
  // signParams.device_type = osName

  return signParams
}

// function urlEncode (param, key, encode) {
//   if (param == null) return ''
//   var paramStr = ''
//   var t = typeof (param)
//   if (t === 'string' || t === 'number' || t === 'boolean') {
//     paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
//   } else {
//     for (var i in param) {
//       var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
//       paramStr += urlEncode(param[i], k, encode)
//     }
//   }
//   return paramStr
// }

export default service
