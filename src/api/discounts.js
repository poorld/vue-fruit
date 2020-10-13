import {apiFruitService} from '@/utils/request'

export function addDiscounts(data) {
  return apiFruitService({
    url: '/fruit/discounts',
    method: 'post',
    data
  })
}
