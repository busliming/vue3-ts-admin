import http from "@/http/http";
import { IAddMenuModel } from "./menuModel";

enum API {
  menuList = '/api/sysUser/getMenuList',
  menu = '/api/menu/list',
  parent = '/api/menu/parent',
  add = '/api/menu',
  edit = '/api/menu',
  delete = '/api/menu',
}

// 获取菜单权限
export const menuListApi = async () => {
  return await http.get(API.menuList)
}

// 权限列表
export const getMenuListApi = async () => {
  return await http.get(API.menu)
}

// 权限--上级菜单接口
export const getMenuParentApi = async () => {
  return await http.get(API.parent)
}

//权限-新增权限
export const addMenuApi = async (params: IAddMenuModel) => {
  return await http.post(API.add, params)
}

//权限-编辑权限
export const editMenuApi = async (params: IAddMenuModel) => {
  return await http.put(API.edit, params)
}

//权限-删除权限
export const deleteMenuApi = async (id: string | number) => {
  return await http.delete(API.edit, { id })
}