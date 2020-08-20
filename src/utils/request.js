import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 获取当前服务器环境下的地址
let mes = window.location;
let _baseurl = `//${mes.hostname}:${mes.port}`;

// create an axios instance
// MOCK使用的
const mockService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_MOCK, // url = base url + request url
  // baseURL: _baseurl,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 跨域请求使用的
const apiService = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API_XIGUA, // url = base url + request url
  baseURL: _baseurl,
  // baseURL: process.env.VUE_APP_BASE_API_PYTHON,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

axios.defaults.withCredentials = true; //配置为true
// request interceptor
mockService.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
mockService.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export {mockService, apiService} 
