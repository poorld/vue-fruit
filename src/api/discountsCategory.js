import {apiFruitService} from '@/utils/request'

export function getDiscountsCat(data) {
  return apiFruitService({
    url: '/fruit/discountsCategory',
    method: 'get',
    data
  })
}
