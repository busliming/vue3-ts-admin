import { IAddDeptModel } from "@/api/dept/deptModel";
import { reactive } from "vue";

export default function useBaseModel() {
  //表单验证规则
  const rules = reactive({
    parentName: [
      {
        required: true,
        message: '请选择上级部门',
        trigger: 'change',
      },
    ],
    name: [
      {
        required: true,
        message: '请输入部门名称',
        trigger: 'change',
      },
    ]
  })
  // 新增或者编辑表单
  const dialogModel = reactive<IAddDeptModel>({
    type: " ",
    id: "",
    pid: "",
    parentName: "",
    manager: "",
    deptAddress: "",
    deptPhone: "",
    name: "",
    deptCode: "",
    orderNum: ""
  })
  return {
    rules,
    dialogModel
  }
}