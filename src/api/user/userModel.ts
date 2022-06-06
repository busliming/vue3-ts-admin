export interface ILoginParams {
  username: string;
  password: string;
  code: string;
}

export interface ILoginResult {
  id: number;
  code: number;
  token: string;
  expireTime: number;
}

export interface IUserInfo {
  id: string,
  avatar: string,
  introduction: string,
  name: string,
  roles: Array<string>
}

// 用户列表参数
export interface IUserList {
  deptId: number,
  currentPage: number,
  pageSize: number,
  loginName: string,
  total: number
}

//用户列表单提交的数据类型
export interface IAddUserModel {
  id?: string;
  type: string;
  deptId: string | number;
  deptName: string;
  email: string;
  loginName: string;
  mobile: string;
  nickName: string;
  password: string;
  username: string;
  sex: string;
}


// 用户管理分配权限接口参数类型
export interface IAssignRoleParams {
  currentPage: number,
  pageSize: number,
  userId: string | number,
  total: number
}


export interface IRoleParams {
  userId: string | number,
  roleId: string | number
}