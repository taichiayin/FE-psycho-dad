import { devRequest as request } from '@/utils/http/index'

export function validateFbToken(data) {
  return request({
    url: '/api/v1/validateFbToken',
    method: 'post',
    data
  })
}

export function getUser() {
  return request({
    url: '/v1/users',
    method: 'get'
  })
}
