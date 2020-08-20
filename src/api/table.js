import {mockService, apiService} from '@/utils/request'

export function getList(params) {
  return mockService({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
