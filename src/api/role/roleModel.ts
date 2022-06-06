//角色列表参数规范
export interface IRoleRequestParams{
  userId?: string | number,
  currentPage: number,
  pageSize: number,
  name?: string,
  total: number
}

//新增角色
export interface IAddRoleModel{
  id?: string,
  name: string,
  remark?: string,
  createUser: string | number,
  type?: string
}

export interface IPermissionParams {
  userId: string | number,
  roleId: string | number
}

export interface IRoleSaveParams {
  roleId: string | number,
  list: Array<string> | Array<number>
}