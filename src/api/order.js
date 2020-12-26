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

// 跟新联系人
export function updateContact(contact) {
  return apiFruitService({
    url: `/fruit/order`,
    method: 'put',
    data: contact
  })
}

// 发货
export function delivery(orderNum) {
  return apiFruitService({
    url: `fruit/order/delivery/${orderNum}`,
    method: 'put'
  })
}
