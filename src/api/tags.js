import request from '../utils/request'

export default {
  findAll() {
    return request({
      url: '/AU/tags/findAll',
      method: 'get'
    })
  },
  insert(summitTags){
    return request({
      url: '/AU/tags/addTags',
      method: 'post',
      data: summitTags
    })
  },
  findTags(tagQuery){
    return request({
      url: '/AU/tags/findTags',
      method: 'post',
      data: tagQuery
    })
  },
  upload(formData) {
    return request({
      url: '/AU/tags/upload',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>'
      }
    })
  }
}