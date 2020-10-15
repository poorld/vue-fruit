import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 获取当前服务器环境下的地址
let mes = window.location;
let _baseurl = `//${mes.hostname}:${mes.port}`;
let _springboot_url = process.env.VUE_APP_BASE_API_SERVER


// create an axios instance

/**
 * MOCK使用的
 */
const mockService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_MOCK, // url = base url + request url
  // baseURL: _baseurl,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
})




/**
 * 跨域请求使用的
 */
// 例如 url: process.env.VUE_APP_BASE_API_PYTHON + '/outwit',
// 最后的链接是 base url + process.env.VUE_APP_BASE_API_PYTHON + '/outwit',
const apiService = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API_XIGUA, // url = base url + request url
  baseURL: _baseurl,
  // baseURL: process.env.VUE_APP_BASE_API_PYTHON,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

/**
 * 水果后台服务
 * 打死也不想用proxy了
 */
const apiFruitService = axios.create({
  // 把process.env.VUE_APP_BASE_API_SERVER拼接到这里，这样就不用在封装的接口里每个url前都要加上
  // baseURL: _baseurl + process.env.VUE_APP_BASE_API_SERVER,
  baseURL: _springboot_url,
  // baseURL: process.env.VUE_APP_BASE_API_PYTHON,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 10, // request timeout
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
})


axios.defaults.withCredentials = true; //配置为true





/**
 * mockService请求拦截器
 */
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

/**
 * mockService响应拦截器
 */
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

//POST传参序列化
apiFruitService.interceptors.request.use(
  config => {
    console.log(config, 'config')
    // if (config.method === "post") {
    //   let curPost = config.url.split("/")[config.url.split("/").length - 1]
    //   if (curPost === "upload" || curPost === "multipleFiles") {
    //     config.headers = {
    //       'Content-type': 'multipart/form-data'
    //     }
    //     return config // 这里对上传文件/图片的 api 不做传参序列化处理
    //   } else {
    //     config.data = JSON.stringify(config.data)
    //     console.error(config.data, 'data')
    //     // config.headers = {
    //     //   'Content-Type': 'application/json; charset=UTF-8'
    //     // }
    //     return config
    //   }
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * mockService响应拦截器
 */
// response interceptor
apiFruitService.interceptors.response.use(
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
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
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
      console.log(res.data)
      return res.data
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

/**
 * mockService mock模拟数据服务
 * apiService 跨域请求服务 先请求本项目地址_baseurl，再通过proxy代理
 * apiFruitService 水果后台服务
 */
export { mockService, apiService, apiFruitService }
