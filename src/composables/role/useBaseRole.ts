import { IAddRoleModel } from "@/api/role/roleModel";
import { reactive } from "vue";

export default function useBaseRole(){
  const roleModel = reactive<IAddRoleModel>({
    name: '',
    remark: '',
    createUser: ''
  })
  const rules = reactive({
    name: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
    ],
  })
  return {
    roleModel,
    rules
  }
}