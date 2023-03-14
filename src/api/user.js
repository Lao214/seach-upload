import request from '../utils/request'

export default {
  addUser(userForm) {
    return request({
      url: '/AU/saUser/addUser',
      method: 'post',
      data: userForm
    })
  },
  getFormDataListPage(current, limit, formQuery) {
    return request({
      url: '/AU/saUser/getFormDataListPage/' + current + '/' + limit,
      method: 'post',
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
      data: formQuery
    })
  },
  login(loginForm) {
    return request({
      url: '/AU/saUser/doLogin',
      method: 'post',
      data: loginForm
    })
  }
}
