import ErrorResponseType from '@/utils/errorResponseType'
import { $vm } from '@/main'

export let globalErrorCache = []

/**
 * 防止同类型错误併发的拦截
 */
export const skipGlobalError = (code) => {
  for (let i = 0; i < globalErrorCache.length; i++) {
    if (globalErrorCache[i].code === code) {
      return true
    }
  }
  return false
}

/**
 * timeout 錯誤處理
 */
export const handleTimeoutError = (timeoutHandle) => {
  const handler = {

    [ErrorResponseType.HINT]: function () {
      $vm.$toast(timeoutHandle.message || '因网络原因暂时无法反馈结果')
      return true
    },

    [ErrorResponseType.NOTIFY]: function () {
      $vm.$NotifyDialog({
        contentText: timeoutHandle.message || '因网络原因暂时无法反馈结果',
        confirmText: timeoutHandle.confirmText || '确定',
        confirmCallback: () => {
          globalErrorCache = []
          timeoutHandle.confirmCallback && timeoutHandle.confirmCallback()
        }
      })
      return false
    },

    [ErrorResponseType.CONFIRM]: function () {
      $vm.$ConfirmDialog({
        contentHeight: 120,
        contentText: timeoutHandle.message || '因网络原因暂时无法反馈结果',
        confirmText: timeoutHandle.confirmText || '确定',
        cancelText: timeoutHandle.cancelText || '取消',
        confirmCallback: () => {
          timeoutHandle.confirmCallback && timeoutHandle.confirmCallback()
        },
        cancelCallback: () => {
          timeoutHandle.cancelCallback && timeoutHandle.cancelCallback()
        }
      })
      return false
    },

    [ErrorResponseType.CUSTOM]: function () {
      console.log('Timeout - ErrorResponseType.CUSTOM')
      return true
    }
  }

  return (handler[timeoutHandle.type] || handler[ErrorResponseType.HINT])()
}

/**
 * 盖板系列错误
 */
export const handleSeverErrors = (statusCode) => {
  const handler = {
    401: () => {
      $vm.$notifyInvalidToken()
      if ($vm.$router.history.current.path !== '/situation/404') {
        $vm.$router.replace({ name: 'PageNotFound' })
      }
      return true
    },

    404: () => {
      if ($vm.$router.history.current.path !== '/situation/404') {
        $vm.$router.replace({ name: 'PageNotFound' })
      }
      return true
    },

    429: () => {
      if ($vm.$router.history.current.path !== '/situation/404') {
        $vm.$router.replace({ name: 'PageNotFound' })
      }
      return true
    },

    500: () => {
      if ($vm.$router.history.current.path !== '/situation/500') {
        $vm.$router.replace({ name: 'ServerErrorPage' })
      }
      return true
    },

    502: () => {
      if ($vm.$router.history.current.path !== '/situation/500') {
        $vm.$router.replace({ name: 'ServerErrorPage' })
      }
      return true
    },

    503: () => {
      if ($vm.$router.history.current.path !== '/situation/500') {
        $vm.$router.replace({ name: 'ServerErrorPage' })
      }
      return true
    },

    pass: () => {
      return false
    }
  }

  return (handler[statusCode] || handler.pass)()
}

/**
 * 处理各类弹窗与客制化错误
 */
export const handleGlobalErrors = (errorHandle, message, error, responseData) => {
  const type = errorHandle?.type ?? undefined

  // 复写 message
  let msg = message
  if (errorHandle && errorHandle.message) {
    msg = errorHandle.message
  }

  const handler = {
    [ErrorResponseType.HINT]: () => {
      console.log('ErrorResponseType.HINT', msg)
      $vm.$toast({
        message: msg,
        duration: 1000
      })
      globalErrorCache = []
    },

    [ErrorResponseType.NOTIFY]: () => {
      console.log('ErrorResponseType.NOTIFY')
      globalErrorCache = []
    },

    [ErrorResponseType.CONFIRM]: () => {
      console.log('ErrorResponseType.CONFIRM')
      // TODO RESPONSE ERROR CONFIRM
      globalErrorCache = []
    },

    [ErrorResponseType.NOTIFY_AUTH]: () => {
      console.log('ErrorResponseType.NOTIFY_AUTH')
      const isTokenFail = errorHandle.code === 405
      const contentText = isTokenFail ? '登录已失效，请重新登录' : '您的账号已在其他设备登录，<br/>请重新登录'
      const contentHeight = isTokenFail ? '' : '122'

      $vm.$NotifyDialog({
        title: '温馨提示',
        contentText,
        contentHeight,
        confirmText: '我知道了',
        confirmCallback: () => {
          globalErrorCache = []
          console.log('$vm.$store', $vm.$store)
          $vm.$notifyInvalidToken()
        }
      })
    },

    [ErrorResponseType.CUSTOM]: () => {
      console.log('ErrorResponseType.CUSTOM')
      const isNotAcceptable = errorHandle.code === 406
      isNotAcceptable && $vm.$router.replace({ name: 'NotAcceptable' })
      globalErrorCache = []
    }
  };

  (handler[type] || handler[ErrorResponseType.HINT])()
  return error ? Promise.reject(error) : responseData
}
