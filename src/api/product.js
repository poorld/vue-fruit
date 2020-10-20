import {apiFruitService} from '@/utils/request'

export function getProducts(data) {
  return apiFruitService({
    url: '/fruit/product',
    method: 'get',
    data
  })
}

export function getProductById(productId) {
  return apiFruitService({
    url: `/fruit/product/${productId}`,
    method: 'get'
  })
}

export function getProductByCategory(data) {
  return apiFruitService({
    url: `/fruit/product/category`,
    method: 'post',
    data
  })
}

export function getProductByQuery(data) {
  return apiFruitService({
    url: `/fruit/product/query`,
    method: 'post',
    data
  })
}

export function addProduct(data) {
  return apiFruitService({
    url: '/fruit/product',
    method: 'post',
    data
  })
}

export function updateProduct(data) {
  return apiFruitService({
    url: '/fruit/product',
    method: 'put',
    data
  })
}
