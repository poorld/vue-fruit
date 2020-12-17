import { apiFruitService } from '@/utils/request'

// 获取销售
export function getOrderSales(categoryId) {
  return apiFruitService({
    url: `/fruit/order/sales/${categoryId}`,
    method: 'get'
  })
}

// 获取所有订单
export function getOrders() {
  return apiFruitService({
    url: `/fruit/order/query`,
    method: 'get'
  })
}

// 取消订单
export function cancelOrder(orderNum) {
  return apiFruitService({
    url: `/fruit/order/payment/cancel/${orderNum}`,
    method: 'put'
  })
}
