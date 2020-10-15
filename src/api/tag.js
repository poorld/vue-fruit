import {apiFruitService} from '@/utils/request'

export function getTags(data) {
  return apiFruitService({
    url: '/fruit/tag',
    method: 'get',
    data
  })
}
