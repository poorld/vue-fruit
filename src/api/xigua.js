import {apiService} from '@/utils/request'

export function getVideo(data) {
  return apiService({
    url: 'http://localhost:9527/api/outwit',
    method: 'post',
    data
  })
}