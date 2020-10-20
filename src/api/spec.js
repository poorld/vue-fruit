import {apiFruitService} from '@/utils/request'

export function addSpec(data) {
  return apiFruitService({
    url: '/fruit/spec',
    method: 'post',
    data
  })
}

export function updateSpec(data) {
  return apiFruitService({
    url: '/fruit/spec',
    method: 'put',
    data
  })
}

export function deleteSpec(id) {
  return apiFruitService({
    url: `/fruit/spec/${id}`,
    method: 'delete'
  })
}
