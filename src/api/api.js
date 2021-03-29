import request from '../util/request.js'
// 获取验证码
export const getcode=(params) => {
  return request({
    url: "/apiRun/lx/sendSmsForRegister",
    method: 'get',
    params: params
  })
}
//提交报名
export const submitData=(data) => {
  return request({
    url: "/apiRun/lx/createUser",
    method: 'post',
    data: data
  })
}
//打卡率列表
export const getratelist=() => {
  return request({
    url: "/apiRun/lx/selectUserApplyList",
    method: 'post',
  })
}

