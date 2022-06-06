export interface ISearchParams {
  searchName: string
}

export interface ITableData {
  list: any
}

//表单提交的数据类型
export interface IAddDeptModel {
  type: string;
  id: string | number;
  pid: string | number;
  parentName: string;
  manager: string;
  deptAddress: string;
  deptPhone: string;
  name: string;
  deptCode: string;
  orderNum: string;
}

//表格数据
export interface IDeptModel {
  id: number,
  pid: number,
  likeId: number,
  parentName: string,
  manager: string,
  name: string,
  deptAddress: string,
  deptPhone: string,
  orderNum: number,
  open: boolean,
  children: Array<string>
}

export interface IParent {
  id: number,
  pid: number,
  likeId: number,
  parentName: string,
  manager: string,
  name: string,
  deptAddress: string,
  deptPhone: string,
  orderNum: number,
  open: boolean,
  children?: Array<IParent>
}

export interface ISelectedNode{
  id: string | number,
  name: string
}