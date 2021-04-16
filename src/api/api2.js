import request from '../util/request2.js'
import { formatTime } from '../assets/js/until.js'
let host = window.location.host
let domain1, domain2, domain3;
if (host.indexOf('walk.shinyway.org') != -1) {
  // 正式环境接口域名
  domain1 = "http://apiWalk.shinyway.org/v2";
  domain2 = "http://apiWalk.shinyway.org/v2";
  domain3 = "http://apiWalk.shinyway.org/v2";
} else {
  // 测试环境接口域名（国君电脑）
  domain1 = "http://10.10.11.56:8010/api";
  domain2 = "http://10.10.11.56:8010/api";
  domain3 = "http://10.10.11.56:8010/api";
 

}
console.log(domain1)
// 开发环境接口域名
// const domain1 = "http://10.10.11.26:8011/proxy/api";//国君电脑上才有api的 测试和正式环境都没有api的,后端开通了跨域所以不需要开发环境代理配置
// const domain2 = "http://10.10.11.26:8011/v2";
// const domain3 = "http://10.10.11.26:8011/v3";


//第一个域名请求不成功请求第二个域名 第三域名
// 国君电脑接口URL需要api测试和正式不需要
const autoRq = (subdata, url, mtd) => {
  let domainType = sessionStorage.getItem("domainType") ? sessionStorage.getItem("domainType") : domain1;//默认是第一个域名，之后就取localStorage的值
  return request({
    url: domainType + url,
    method: mtd,
    params: subdata
  }).then(res => {
    if (res.status != 200) {
      return request({
        url: domain1 + url,
        method: mtd,
        params: subdata
      }).then(res2 => {
        if (res2.status != 200) {
          return request({
            url: domain2 + url,
            method: mtd,
            params: subdata
          }).then(res3 => {

            if (res3.status != 200) {
              return request({
                url: domain3 + url,
                method: mtd,
                params: subdata
              }).then(res4 => {

                if (res4.status != 200) {
                  Promise.resolve(res4.data)
                } else {
                  if (subdata.clientKey && subdata.clientSecret) {
                    localStorage.setItem("lxAppToken", res4.data.data)
                  }
                  sessionStorage.setItem("domainType", domain3)//localStorage 为domain3
                  return Promise.resolve(res4.data)
                }

              })
            } else {
              if (subdata.clientKey && subdata.clientSecret) {
                localStorage.setItem("lxAppToken", res3.data.data)
              }
              sessionStorage.setItem("domainType", domain2)//localStorage 为domain2
              return Promise.resolve(res3.data)
            }

          })
        } else {

          if (subdata.clientKey && subdata.clientSecret) {
            localStorage.setItem("lxAppToken", res2.data.data)
          }
          sessionStorage.setItem("domainType", domain1) //localStorage 为domain1
          return Promise.resolve(res2.data)
        }
      })
    } else {
      if (subdata.clientKey && subdata.clientSecret) {
        localStorage.setItem("lxAppToken", res.data.data)
      }

      return Promise.resolve(res.data)
    }
  })
}
// 获取签名
export const getToken = () => {
  let subdata = { clientKey: "ghuijo78iuonklmsd", clientSecret: "hggfgyhjikl7889ioijh" }
  return autoRq(subdata, "/remote/sysLogin", 'post')
}
//betys转换成字符串
function getStrFromBytes(arr) {
  var r = "";
  for (var i = 0; i < arr.length; i++) {
    r += String.fromCharCode(arr[i]);
  }
  return r;
}
let lxAppToken = localStorage.getItem("lxAppToken")
if (!lxAppToken) {
  lxAppToken = localStorage.setItem("lxAppToken", "sdsdfsdfsdfsfdsdf")

}
// 引入加密的库
let CryptoJS = require("crypto-js");
function encryptByDES(str) {
  var keyHex = CryptoJS.enc.Utf8.parse('cfgubijn');
  var ivHex = CryptoJS.enc.Utf8.parse(getStrFromBytes([1, 2, 3, 4, 5, 6, 7, 8]));
  var encrypted = CryptoJS.DES.encrypt(str, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();//这个方法已经使用了base64了，所以之后就不需要base64加密了
}
let requestTime = formatTime(new Date())
let baseObj = { 'requestTime': requestTime, "transCode": "LxCommon", "common_platform": "H5" }


export const signSub = (data, url, mtd) => {
  let lxAppToken = localStorage.getItem("lxAppToken") ? localStorage.getItem("lxAppToken") : "sdsdfsdfsdfsfdsdf";
  let xgps = url.lastIndexOf("/")//获取/后面的字符串
  let transCodes = url.substring(xgps + 1)
  let beforeD = Object.assign(baseObj, { 'token': lxAppToken, "transCodes": transCodes }, data)
  beforeD = JSON.stringify(beforeD)
  let D = encryptByDES(beforeD)
  let H = CryptoJS.MD5(beforeD + "hksdgfj;sgijlkeg^#*5824jk").toString()
  let subdata = {
    D, H
  }
  return autoRq(subdata, url, mtd)
}



