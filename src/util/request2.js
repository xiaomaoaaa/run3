
import axios from 'axios'
// 创建axios实例
const service = axios.create({
  // baseURL:"/proxyApi/", // 开发用的base_url  生产直接注释掉本行代码用相对路径
  // baseURL:  "/proxyApi/",
  timeout: 15000, // 请求超时时间
  // withCredentials: true, //携带cookie写信的时候才开启
  headers: { //跨域的时候用简单请求不然会发生2次请求 一次是验证域名是否在服务器的允许域名内同时
    //满足下列三大条件，就属于简单请求，否则属于非简单请求
    // 1.请求方式只能是：GET、POST、HEAD
    // 2.HTTP请求头限制这几种字段：Accept、Accept-Language、Content-Language、Content-Type、Last-Event-ID
    // 3.Content-type只能取：application/x-www-form-urlencoded、multipart/form-data、text/plain
    // 对于简单请求，浏览器直接请求，会在请求头信息中，增加一个origin字段，来说明本次请求来自哪个源（协议+域名+端口）。服务器根据这个值，来决定是否同意该请求.
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    // 'Access-Control-Allow-Credentials': true,//携带cookie写信的时候才开启
    // 'X-Requested-With': 'XMLHttpRequest',//允许异步请求

  }
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    return response  //返回原生的响应 这里和request.js不一样
  },
  error => {
    return {
      data: {
        status: "404"
      },
      status: "404"
    }
  }
)
export default service