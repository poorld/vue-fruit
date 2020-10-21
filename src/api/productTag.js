/**
 * 商品介绍
 */
import { apiFruitService } from '@/utils/request'

export function updateProductTag(data, productId) {
  return apiFruitService({
    url: `/fruit/product/tag/${productId}`,
    method: 'post',
    data
  })
}

