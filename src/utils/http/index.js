import defaultRequest, { _addSign } from '@/utils/http/request'
// import ErrorResponseType from '@/utils/errorResponseType'

export const devRequest = async(req, errorTypes = []) => {
  // const serviceApiPrefix = process.env.IS_MOCK ? '/mock-api' : '/api'
  const serviceApiPrefix = '/api'

  const signParams = await _addSign()
  // console.log('signParams: ', signParams)
  const headers = {}
  const axiosCommon = req.headers || {}
  headers['Accept-Language'] = 'zh-tw'
  headers.appType = '0' // 0-平台，1-体育
  req.headers = { ...axiosCommon, ...headers, ...signParams }

  // const globalError = [
  //   {
  //     code: 405,
  //     type: ErrorResponseType.NOTIFY_AUTH
  //   },
  //   {
  //     code: 408,
  //     type: ErrorResponseType.NOTIFY_AUTH
  //   },
  //   {
  //     code: 500,
  //     type: ErrorResponseType.HINT,
  //     message: '系统繁忙，请稍后再试'
  //   },
  //   {
  //     code: 10000,
  //     type: ErrorResponseType.HINT,
  //     message: '出现了错误，请稍后再试'
  //   },
  //   {
  //     code: 406,
  //     type: ErrorResponseType.CUSTOM
  //   },
  //   ...errorTypes
  // ]

  // const timeoutHandle = {
  //   // 預設 timeout 錯誤處理方式
  //   type: ErrorResponseType.NOTIFY,
  //   // 預設 timeout 時間為 30000ms
  //   timeout: 30000
  // }

  return defaultRequest.request({
    ...req,
    // errorTypes: globalError,
    // timeoutHandle,
    // timeout: timeoutHandle.timeout,
    url: `${req.prefix || serviceApiPrefix}${req.url || ''}`
  })
}
