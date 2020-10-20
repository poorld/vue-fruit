import {apiFruitService} from '@/utils/request'

export function addProductBanner(data) {
  return apiFruitService({
    url: '/fruit/product/banner',
    method: 'post',
    data
  })
}


export function updateProductBanner(data) {
  return apiFruitService({
    url: '/fruit/product/banner',
    method: 'put',
    data
  })
}
