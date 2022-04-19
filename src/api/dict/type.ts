import request from '@/utils/request'

// 查询字典类型列表
export function listType(query:any) {
  return request({
    url: '/api/system/dict/type/list',
    method: 'get',
    params: query
  })
}

// 查询字典类型详细
export function getType(dictId:any) {
  return request({
    url: '/api/system/dict/type/' + dictId,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data:any) {
  return request({
    url: '/api/system/dict/type/edit',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data:any) {
  return request({
    url: '/api/system/dict/type/edit',
    method: 'put',
    data: data
  })
}

// 删除字典类型
export function delType(dictId:any) {
  return request({
    url: '/api/system/dict/type/' + dictId,
    method: 'delete'
  })
}

// 清理参数缓存
export function clearCache() {
  return request({
    url: '/api/system/dict/type/clearCache',
    method: 'delete'
  })
}

// 导出字典类型
export function exportType(query:any) {
  return request({
    url: '/api/system/dict/type/export',
    method: 'get',
    params: query
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/api/system/dict/type/optionselect',
    method: 'get'
  })
}
