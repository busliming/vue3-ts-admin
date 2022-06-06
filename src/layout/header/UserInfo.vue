<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <img class="user" src="@/assets/mv.jpg" alt srcset />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="restore">还原数据</el-dropdown-item>
        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang='ts'>
import { restoreApi, loginOutApi} from '@/api/user/index'
import useInstance from '@/hooks/useInstance';
import { clearSession, getToken } from '@/untils/auth';
const { global } = useInstance()
const restore = async () => {
  let confirm = await global.$myConfirm('确定还原数据吗？')
  if(confirm){
    let res = await restoreApi();
    if(res && res.code == 200){
      global.$message({message: res.msg, type: 'success'})
    }
  }
}
const loginOut = async () => {
  let confirm = await global.$myConfirm('确定退出登录吗？')
  if(confirm){
    let params = {
      token: getToken()
    }
    let res = await loginOutApi(params)
    if(res && res.code == 200){
      global.$message({message: res.msg, type: 'success'})
      window.location.href = '/login'
      clearSession();
    }
  }
}
</script>
<style scoped lang='scss'>
.user {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>