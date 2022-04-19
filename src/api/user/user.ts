import request from '@/utils/request'
import { praseStrZero } from "@/utils/ruoyi";

// 查询用户列表
export function listUser(query:any) {
  return request({
    url: '/api/system/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId:any) {
  return request({
    url: '/api/system/user/' + praseStrZero(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data:any) {
  return request({
    url: '/api/system/user/edit',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data:any) {
  return request({
    url: '/api/system/user/edit',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId:any) {
  return request({
    url: '/api/system/user/' + userId,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query:any) {
  return request({
    url: '/api/system/User/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(userId:any, password:any) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/api/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId:any, status:any) {
  const data = {
    userId,
    status
  }
  return request({
    url: '/api/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/api/system/user/Profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data:any) {
  return request({
    url: '/api/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword:any, newPassword:any) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/api/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data:any) {
  return request({
    url: '/api/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/api/system/user/importTemplate',
    method: 'get',
    responseType: 'blob'//1.首先设置responseType对象格式为 blob:
  })
}
