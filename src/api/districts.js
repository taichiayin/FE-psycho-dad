import { devRequest as request } from '@/utils/http/index'

export function getAllDistricts(params) {
  return request({
    url: '/v1/districts',
    method: 'get',
    params
  })
}
