import {apiFruitService} from '@/utils/request'

export function getBanners(data) {
  return apiFruitService({
    url: '/fruit/banner/all',
    method: 'get',
    data
  })
}

export function addBanner(data) {
  return apiFruitService({
    url: '/fruit/banner',
    method: 'post',
    data,
  })
}

export function updateBanner(data) {
  return apiFruitService({
    url: '/fruit/banner',
    method: 'put',
    data,
  })
}

