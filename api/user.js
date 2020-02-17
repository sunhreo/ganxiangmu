// 导入axios模块
import request from '@/utils/request.js'
// 创建各种api方法
export function apiUserLogin ({ mobile, code }) {
  // return 返回执行结果,是promise对象
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data: {
    // 对象简易赋值
      mobile,
      code
    }
  })
}
