import { devRequest as request } from '@/utils/http/index'

export function getFavorites(params) {
  return request({
    url: `/v1/favorites`,
    method: 'get',
    params
  })
}

export function CreateFavorite(data) {
  return request({
    url: `/v1/favorites`,
    method: 'post',
    data
  })
}

export function DeleteFavorite(data) {
  return request({
    url: `/v1/favorites`,
    method: 'delete',
    data
  })
}
