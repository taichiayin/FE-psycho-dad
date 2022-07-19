import { devRequest as request } from '@/utils/http/index'

export function getAllTypes() {
  return request({
    url: '/v1/types',
    method: 'get'
  })
}
