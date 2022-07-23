import { devRequest as request } from '@/utils/http/index'

export const upload = data => {
  return request({
    url: '/v1/upload',
    method: 'post',
    data
  })
}

