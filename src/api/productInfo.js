/**
 * 商品介绍
 */
import { apiFruitService } from '@/utils/request'

export function addProductInfo(data) {
  return apiFruitService({
    url: '/fruit/product/info',
    method: 'post',
    data
  })
}


export function updateProductInfo(data) {
  return apiFruitService({
    url: '/fruit/product/info',
    method: 'put',
    data
  })
}

export function updateInfoSort(data) {
  return apiFruitService({
    url: '/fruit/product/info/sort',
    method: 'put',
    data
  })
}

export function deleteProductInfo(id) {
  return apiFruitService({
    url: `/fruit/product/info/${id}`,
    method: 'delete'
  })
}
