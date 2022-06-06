import http from "@/http/http";
import { IAddRoleModel, IPermissionParams, IRoleRequestParams, IRoleSaveParams } from './roleModel'
enum API {
  getRoleList = '/api/role/list',
  addRole = '/api/role',
  editRole = '/api/role',
  deleteRole = '/api/role',
  menuParent = "/api/menu/parent",
  tree = "/api/role/getAssignPermissionTree",
  save = "/api/role/roleAssignSave"
}

export const getRoleListApi = async (params: IRoleRequestParams) => {
  return await http.get(API.getRoleList, params)
}
// 用户列表请求接口
// export const getUserListApi = async (params: IUserList) => {
//   return await http.get(API.userList, params)
// }

export const addRoleApi = async (params: IAddRoleModel) => {
  return await http.post(API.addRole, params)
}

export const editRoleApi = async (params: IAddRoleModel) => {
  return await http.put(API.addRole, params)
}

export const deleteRoleApi = async (id: string) => {
  return await http.delete(API.addRole, { id })
}

export const getMenuParentApi = async () => {
  return await http.get(API.menuParent)
}


// 角色管理  --- 分配权限弹窗  权限接口
export const getPermissionTreeApi = async (params: IPermissionParams) => {
  return await http.get(API.tree, params)
}

// 分配权限保存接口
export const postRoleSaveApi = async (params: IRoleSaveParams) => {
  return await http.post(API.save,params)
}