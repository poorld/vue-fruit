import request from '@/utils/request'

export function getVideo(data) {
  return request({
    url: 'http://127.0.0.1:9527/api/outwit',
    method: 'post',
    data
  })
}