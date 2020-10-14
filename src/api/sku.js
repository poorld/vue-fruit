import {apiFruitService} from '@/utils/request'

export function getSku(data) {
  return apiFruitService({
    url: '/fruit/sku',
    method: 'get',
    data
  })
}

