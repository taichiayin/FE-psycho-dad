import { devRequest as request } from '@/utils/http/index'

export function validateFbToken(data) {
  return request({
    url: '/v1/validateFbToken',
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

export function login(data) {
  return request({
    url: '/v1/login',
    method: 'post',
    data
  })
}
