import { devRequest as request } from '@/utils/http/index'

export const getStores = params => {
  return request({
    url: '/v1/stores',
    method: 'get',
    params
  })
}

export const getStoresList = params => {
  return request({
    url: '/v1/stores/list',
    method: 'get',
    params
  })
}

export const getStoreDetail = storeId => {
  return request({
    url: `/v1/stores/${storeId}`,
    method: 'get'
  })
}

export const getStoresForEdit = () => {
  return request({
    url: '/v1/stores/edit',
    method: 'get'
  })
}

export const CreateStore = data => {
  return request({
    url: '/v1/stores',
    method: 'post',
    data
  })
}

export const UpdateStore = (storeId, data) => {
  return request({
    url: `/v1/stores/${storeId}`,
    method: 'put',
    data
  })
}

