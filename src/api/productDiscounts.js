import {apiFruitService} from '@/utils/request'

export function updateUserDiscounts(data, productId) {
  return apiFruitService({
    url: `/fruit/product/user/discounts/${productId}`,
    method: 'post',
    data
  })
}

export function updateMemberDiscounts(data, productId) {
  return apiFruitService({
    url: `/fruit/product/member/discounts/${productId}`,
    method: 'post',
    data
  })
}

