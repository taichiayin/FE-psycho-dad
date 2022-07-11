import { devRequest as request } from '@/utils/http/index'

export function login(data) {
  return request({
    url: '/api/v1/users',
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
