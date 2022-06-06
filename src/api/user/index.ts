import http from "@/http/http";
import { IAddUserModel, IAssignRoleParams, ILoginResult, IRoleParams, IUserInfo, IUserList } from "./userModel";

enum API {
  image = '/api/sysUser/image',
  login = '/api/user/login',
  getInfo = '/api/sysUser/getInfo',
  leftTree = '/api/department/list',
  userList = '/api/user/list',
  add = '/api/user',
  edit = '/api/user',
  delete = "/api/user",
  getRolistForAssign = "/api/user/getRolistForAssign",
  getByUserId = "/api/user/getRoleIdByUserId",
  save = "/api/user/assingRole",
  loginOut = "/api/sysUser/loginOut",
  restore = "/api/backup/restore",
}
export async function getImageApi() {
  return await http.getImage(API.image);
}

export async function loginApi(params: any) {
  return await http.login<ILoginResult>(API.login, params)
}

export const getInfoApi = async () => {
  return await http.get<IUserInfo>(API.getInfo)
}

// 用户列表左侧部门数接口
export const getLeftTreeApi = async () => {
  return await http.get(API.leftTree)
}

// 用户列表请求接口
export const getUserListApi = async (params: IUserList) => {
  return await http.get(API.userList, params)
}

// 新增用户请求接口
export const addUserApi = async (params: IAddUserModel) => {
  return await http.post(API.add, params)
}

// 编辑用户请求接口
export const editUserApi = async (params: IAddUserModel) => {
  return await http.put(API.edit, params)
}

// 删除用户请求接口
export const deleteUserApi = async (id: string) => {
  return await http.delete(API.edit, { id })
}


//  用户管理--- 分配权限接口
export const getRoleListForAssignApi = async (params: IAssignRoleParams) => {
  return await http.get(API.getRolistForAssign, params)
}


// 用户管理 弹窗  -- 根据用户查询角色
export const getRoleByUserIdApi = async (userId: string | number) => {
  return await http.getRestApi(API.getByUserId, { userId })
}

// 用户管理弹窗 -- 修改角色分配
export const assignRoleApi = async (params: IRoleParams) => {
  return await http.post(API.save, params)
}

// 退出登录接口
export const loginOutApi = async (params: any) => {
  return await http.post(API.loginOut, params)
}

// 数据库还原
export const restoreApi = async () => {
  return await http.post(API.restore, null)
}