import {apiFruitService} from '@/utils/request'

export function addDiscounts(data) {
  return apiFruitService({
    url: '/fruit/discounts',
    method: 'post',
    data
  })
}

export function getDiscounts(data) {
  return apiFruitService({
    url: '/fruit/discounts',
    method: 'get',
    data
  })
}

export function updateDiscounts(data) {
  return apiFruitService({
    url: '/fruit/discounts',
    method: 'put',
    data
  })
}

export function deleteDiscounts(data) {
  return apiFruitService({
    url: `/fruit/discounts/${data}`,
    method: 'delete'
  })
}


export function getUserDiscounts(data) {
  return apiFruitService({
    url: '/fruit/discounts/user',
    method: 'get',
    data
  })
}

export function getMemberDiscounts(data) {
  return apiFruitService({
    url: '/fruit/discounts/member',
    method: 'get',
    data
  })
}
