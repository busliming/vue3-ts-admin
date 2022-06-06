
import { ILoginParams } from "@/api/user/userModel"
import { useStore } from "@/store";
import { ElMessage } from "element-plus";
import { getCurrentInstance } from "vue"
import { useRouter } from "vue-router";
export default function useLogin(loginModel: ILoginParams) {
  let { proxy } = getCurrentInstance() as any;
  const store = useStore();
  const router = useRouter()
  const getLogin = () => {
    proxy.$refs.loginForm.validate((valid: boolean) => {
      if (valid) {
        store.dispatch('user/loginAction', loginModel).then(res => {
          if (res.data.code == 200) {
            // 放在此处登录时候才会掉用，就会存在刷新的情况下取不到权限的情况 
            // store.dispatch('user/getInfoAction')
            router.push({ path: '/' })
            ElMessage.success('登录成功')
          }
        }).catch(error => {
          console.error(error)
        })
      }
    })
  }
  return {
    getLogin
  }
}