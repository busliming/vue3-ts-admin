import { ILoginParams } from "@/api/user/userModel"
import { ref,reactive } from "vue"

export  default function useBaseLogin(){
  const loginModel = reactive<ILoginParams>({
    username: 'admin',
    password: '1234',
    code: ''
  })
  const rules = reactive({
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入用户密码',
        trigger: 'blur',
      },
    ],
    code: [
      {
        required: true,
        message: '请输入验证码',
        trigger: 'blur',
      },
    ]
  })
  const loginForm = ref(null)
  return {
    loginModel,
    rules,
    loginForm
  }
}