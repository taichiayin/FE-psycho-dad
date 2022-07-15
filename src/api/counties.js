import { devRequest as request } from '@/utils/http/index'

export function getAllCounties(params) {
  return request({
    url: '/v1/counties',
    method: 'get',
    params
  })
}
