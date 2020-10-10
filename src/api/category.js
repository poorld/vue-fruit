import { from } from "core-js/fn/array";
import {apiFruitService} from '@/utils/request'

export function getCategory(data) {
  return apiFruitService({
    url: '/fruit/category',
    method: 'get',
    data
  })
}

export function addCategory(data) {
  return apiFruitService({
    url: '/fruit/category',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return apiFruitService({
    url: '/fruit/category',
    method: 'put',
    data
  })
}

export function deleteCategory(data) {
  return apiFruitService({
    url: '/fruit/category',
    method: 'delete',
    data
  })
}


