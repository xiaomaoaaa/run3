import Vue from "vue"
// 最终使用的版本
import axios from 'axios'
const domain = window.location.host
// 创建axios实例
const service = axios.create({
  baseURL:domain=="walk.shinyway.org"?"//":"/run/", //生产用的
  // baseURL: "/proxyapi/run/", // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true, // 默认的
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Accept': 'application/json',
    // 'Access-Control-Allow-Credentials': true,
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return error
  }
)
export default service