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
