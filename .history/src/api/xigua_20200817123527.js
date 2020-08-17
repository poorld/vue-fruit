

/*
 * @Author: OutwitTheMilk
 * @Date: 2020-08-17 12:34:29
 * @LastEditors: OutwitTheMilk
 * @LastEditTime: 2020-08-17 12:35:27
 * @FilePath: \src\api\xigua.js
 * @Description: 
 */
import request from '@/utils/request'

export function getVideo(data) {
    return request({
      url: 'http://127.0.0.1:9527/api/outwit',
      method: 'post',
      data
    })
  }