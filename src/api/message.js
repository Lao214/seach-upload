import request from '../utils/request'

export default {
  summit(form) {
    return request({
      url: '/AU/message/addMessage',
      method: 'post',
      data: form
    })
  },
}