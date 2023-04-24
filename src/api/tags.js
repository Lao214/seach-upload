import request from '../utils/request'

export default {
  findAll() {
    return request({
      url: '/AU/tags/findAll',
      method: 'get'
    })
  }
}