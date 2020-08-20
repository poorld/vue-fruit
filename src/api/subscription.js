import {mockService, apiService} from '@/utils/request'

export function getList(params) {
  return mockService({
    url: '/vue-admin-template/subscription/list',
    method: 'get',
    params
  })
}

export function sb() {
  return apiService({
    url: process.env.VUE_APP_BASE_API_PYTHON + '/api/outwit',
    method: 'post',
    data: {
      "videolink": "gg"
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
} 

export function xigua(data) {
  return apiService({
    url: process.env.VUE_APP_BASE_API_XIGUA + '/video/app/user/home/?to_user_id=4076588298929316&format=json&source=pgc_author_name&list_entrance=shortvideo&max_behot_time=',
    method: 'get',
    data
  })
}