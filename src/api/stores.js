import { devRequest as request } from '@/utils/http/index'

export const getStores = params => {
  return request({
    url: '/v1/stores',
    method: 'get',
    params
  })
}

