import request from '@/utils/request'

// 查询角色列表
export function listRole(query:any) {
  return request({
    url: '/api/system/role/list',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId:any) {
  return request({
    url: '/api/system/role/' + roleId,
    method: 'get'
  })
}

// 新增角色
export const addRole = (data:any) => {
  return request({
    url: '/api/system/role/edit',
    method: 'post',
    data: data,
  })
}

// 修改角色
export function updateRole(data:any) {
  return request({
    url: '/api/system/role/edit',
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(data:any) {
  return request({
    url: '/api/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId:any, status:any) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/api/system/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId:any) {
  return request({
    url: '/api/system/role/' + roleId,
    method: 'delete'
  })
}

// 导出角色
export function exportRole(query:any) {
  return request({
    url: '/api/system/role/export',
    method: 'get',
    params: query
  })
}
//导出表格下载
const baseURL = process.env.BASE_URL
export function download(fileName:any) {
  window.open(baseURL+'api' + fileName)
}
