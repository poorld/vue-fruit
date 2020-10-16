import {apiFruitService} from '@/utils/request'

export function addProduct(data) {
  return apiFruitService({
    url: '/fruit/product',
    method: 'post',
    data
  })
}
