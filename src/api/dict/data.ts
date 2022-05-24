import request from '@/utils/request'

// 查询字典数据列表
export function listData(query:any) {
  return request({
    url: '/dmapi/system/dict/data/list',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode:any) {
  return request({
    url: '/dmapi/system/dict/data/info/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType:any) {
  if (typeof (dictType) === "object") {
    return request({
      url: '/dmapi/system/dict/data/types',
      data: dictType,
      method: 'post'
    })
  } else {
    return request({
      url: '/dmapi/system/dict/data/type/' + dictType,
      method: 'get'
    })
  }
}

// 新增字典数据
export function addData(data:any) {
  return request({
    url: '/dmapi/system/dict/data',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data:any) {
  return request({
    url: '/dmapi/system/dict/data',
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode:any) {
  return request({
    url: '/dmapi/system/dict/data/' + dictCode,
    method: 'delete'
  })
}

// 导出字典数据
export function exportData(query:any) {
  return request({
    url: '/dmapi/system/dict/data/export',
    method: 'get',
    params: query
  })
}