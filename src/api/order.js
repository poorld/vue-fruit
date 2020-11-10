import { apiFruitService } from '@/utils/request'

export function getOrderSales(categoryId) {
  return apiFruitService({
    url: `/fruit/order/sales/${categoryId}`,
    method: 'get'
  })
}
