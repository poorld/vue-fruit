import {mockService, apiService, apiFruitService} from '@/utils/request'

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

export function getAllUser() {
  return apiFruitService({
    url: '/fruit/user',
    method: 'get'
  })
}

export function updateUser(user) {
  return apiFruitService({
    url: '/fruit/user',
    method: 'put',
    data: user
  })
}

