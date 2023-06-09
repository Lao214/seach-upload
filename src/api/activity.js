import request from '../utils/request'

export default {
  upload(form) {
    return request({
      url: '/AU/sysActivity/upload',
      method: 'post',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>'
      }
    })
  },
  insert(insertActivityDTO){
    return request({
      url: '/AU/sysActivity/InterActivity',
      method: 'post',
      data: insertActivityDTO
    })
  },
  getFormDataListPage(current, limit, formQuery) {
    return request({
      url: '/AU/sysEnterActivity/getFormDataListPage/' + current + '/' + limit,
      method: 'post',
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
      data: formQuery
    })
  },
  downloadFormDataListPage(current, limit, formQuery) {
    return request({
      url: '/AU/sysActivity/downloadFormDataListPage/' + current + '/' + limit,
      method: 'get',
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
      responseType: "blob",
      params: formQuery
    })
  },
  auditEnter(id, auditStatus) {
    return request({
      url: '/AU/sysEnterActivity/auditEnter/' + id + '/' + auditStatus,
      method: 'post'
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
    })
  },
  getProjectActivityListPage(current, limit, formQuery) {
    return request({
      url: '/AU/sysActivity/getFormDataListPage/' + current + '/' + limit,
      method: 'post',
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
      data: formQuery
    })
  },
  getAuditList(current, limit, formQuery) {
    return request({
      url: '/AU/sysActivity/getAuditList/' + current + '/' + limit,
      method: 'post',
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
      data: formQuery
    })
  },
  deleteEnter(enterId) {
    return request({
      url: '/AU/sysActivity/deleteEnter/' + enterId,
      method: 'delete'
    })
  },
  deleteActivity(id) {
    return request({
      url: '/AU/sysActivity/deleteActivity/' + id,
      method: 'delete'
    })
  },
  updateActivity(formUpdate) {
    return request({
      url: '/AU/sysActivity/updateActivity',
      method: 'post',
      data: formUpdate
    })
  },
  getCount(id) {
    return request({
      url: '/AU/sysActivity/getCount/' + id,
      method: 'get'
    })
  }
}