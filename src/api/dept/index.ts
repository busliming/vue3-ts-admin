import http from "@/http/http";
import { IAddDeptModel, ISearchParams } from "./deptModel";

enum API {
  deptList = '/api/department/list',
  parent = '/api/department/parent',
  add = '/api/department',
  edit = '/api/department',
  delete = '/api/department',
}

// 组织机构数据
export const deptListApi = async (searchParams: ISearchParams) => {
  return await http.get(API.deptList, searchParams)
}

// 树形组件
export const parentApi = async () => {
  return await http.get(API.parent)
}

// 新增部门
export const addDeptApi = async (params: IAddDeptModel) => {
  return await http.post(API.add, params)
}

// 编辑部门
export const editDeptApi = async (params: IAddDeptModel) => {
  return await http.put(API.edit, params)
}

// 删除部门
export const deleteDeptApi = async (id: string) => {
  return await http.delete(API.delete, { id })
}

