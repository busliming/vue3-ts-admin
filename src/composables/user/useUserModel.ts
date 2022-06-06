import { IAddUserModel } from "@/api/user/userModel";
import { reactive } from "vue";

export default function useUserModel() {
  //表单验证规则
  const rules = reactive({
    deptName: [
      {
        required: true,
        message: '请选择所属部门',
        trigger: 'change',
      },
    ],
    loginName: [
      {
        required: true,
        message: '请输入姓名',
        trigger: 'change',
      },
    ],
    mobile: [
      {
        required: true,
        message: '请输入电话',
        trigger: 'change',
      },
    ],
    username: [
      {
        required: true,
        message: '请输入登录名',
        trigger: 'change',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'change',
      },
    ],
    sex: [
      {
        required: true,
        message: '请选择性别',
        trigger: 'change',
      },
    ]
  })
  // 新增或者编辑表单
  const dialogModel = reactive<IAddUserModel>({
    type: '',
    deptId: '',
    deptName: '',
    email: '',
    loginName: '',
    mobile: '',
    nickName: '',
    password: '',
    username: '',
    sex: '',
  })
  return {
    rules,
    dialogModel
  }
}