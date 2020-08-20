import {mockService, apiService} from '@/utils/request'

export function login(data) {
  return mockService({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return mockService({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return mockService({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
