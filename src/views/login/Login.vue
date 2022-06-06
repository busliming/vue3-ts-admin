<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginModel"
      ref="loginForm"
      :rules="rules"
      :inline="false"
      size="large"
    >
      <el-form-item style="text-align: center; display: flex; justify-content: center;">
        <!-- <div class="login-title">商户管理后台系统</div> -->
        <div class="login-title">商户管理后台系统</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="loginModel.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="loginModel.password"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20" style="height: 40px;">
          <el-col :span="16">
            <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input>
          </el-col>
          <el-col :span="4" style="width: 100%;">
            <img v-if="imageSrc" width="143" height="40" @click="getImageSrc" :src="imageSrc">
            <!-- <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input> -->
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item >
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="12">
            <el-button class="btn" type="primary" @click="getLogin">登录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="btn">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- <el-form-item>
       <el-button type="primary" @click="onSubmit">立即创建</el-button>
       <el-button>取消</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>
<script setup lang='ts'>
import userImage from '@/composables/user/useImage';
import useBaseLogin from '@/composables/user/useBaseLogin'
import userLogin from '@/composables/user/userLogin'

//图片验证码
const { imageSrc, getImageSrc } = userImage();

//基础数据
const { loginModel,rules,loginForm } = useBaseLogin()

//登录接口请求
const { getLogin } = userLogin(loginModel)

</script>
<style scoped lang='scss'>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .login-form {
    width: 400px;
    height: 328px;
    padding: 30px 40px;
    box-shadow: 0 0 25px #6c6c5c;
    border-radius: 15px;
    text-align: center;
    .login-title {
      font-size: 30px;
      text-align: center;
      font-weight: bold;
      margin: 0 auto;
    }
    .btn {
      width: 190px;
    }
  }
}
</style>