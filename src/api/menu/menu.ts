import request from '@/utils/request'

// 查询菜单列表
export function listMenu(query?:any) {
  return request({
    url: '/dmapi/system/menu/list',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId:any) {
  return request({
    url: '/dmapi/system/menu/' + menuId,
    method: 'get',
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/dmapi/system/Menu/treeSelect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId:any) {
  return request({
    url: '/dmapi/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get',
  })
}

// 新增菜单
export const addMenu = (data:any) => {
  return request({
    url: '/dmapi/system/menu/add',
    method: 'put',
    data: data,
  })
}

// 修改菜单
export function updateMenu(data:any) {
  return request({
    url: '/dmapi/system/Menu/edit',
    method: 'post',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId:any) {
  return request({
    url: '/dmapi/system/Menu/' + menuId,
    method: 'delete'
  })
}

//排序
export function changeMenuSort(data:any) {
  return request({
    url: '/dmapi/system/Menu/ChangeSort',
    method: 'post',
    data: data
  })
}

// 获取路由
export const getRouters = (query:any) => {
  return request({
    url: '/dmapi/getRouters',
    method: 'get',
    params: query
  })
}
