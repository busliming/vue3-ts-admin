<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template #content>
      <el-form
        :model="dialogModel"
        ref="userFromRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="deptName" @click="handleDeptShow">
              <el-input type="hidden" v-model="dialogModel.deptId"></el-input>
              <el-input v-model="dialogModel.deptName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="loginName">
              <el-input v-model="dialogModel.loginName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="mobile">
              <el-input v-model="dialogModel.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="dialogModel.nickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="dialogModel.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录名" prop="username">
              <el-input v-model="dialogModel.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="dialogModel.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="dialogModel.sex">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
  <!-- 部门组织图 -->
  <parent ref="parentRef" @select="select"></parent>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import parent from '@/views/system/department/parent.vue';
import useDialog from '@/hooks/useDialog';
import useUserModel from '@/composables/user/useUserModel'
import useInstance from '@/hooks/useInstance';
import { addUserApi, editUserApi } from '@/api/user'
import { ElForm, ElMessage } from 'element-plus';
import { ref } from 'vue';
import useParent from '@/composables/dept/useParent';
import { ISelectedNode } from '@/api/dept/deptModel';
import { EditType } from '@/types/BaseEnum';
import { IAddUserModel } from '@/api/user/userModel';
// 全局配置
const { global } = useInstance();
// 子组件传参给父组件，调用父组件的方法 在父组件定义
const emit = defineEmits(['saveBtn'])
// 弹窗属性和方法
const { dialog, onClose, onShow } = useDialog()
// 表单数据/验证规则
const { dialogModel, rules } = useUserModel();
// 绑住表单元素
const userFromRef = ref<InstanceType<typeof ElForm>>()
// 弹窗确认按钮
const confirm = () => {
  console.log(dialogModel, 'getUserList')
  userFromRef.value?.validate(async valid => {
    if (valid) {
      // 发送请求 
      let res;
      if (dialogModel.type == EditType.ADD) {
        res = await addUserApi(dialogModel);
      } else {
        res = await editUserApi(dialogModel);
      }
      if (res && res.code == 200) {
        ElMessage.success(res.msg)
        emit('saveBtn', dialogModel)
        onClose();
      }
    } else {

    }
  })
}
// 给父组件调用组件弹窗是否显示
const show = (type: string, row: IAddUserModel) => {
  dialog.title = type == EditType.ADD ? "新增用户" : '编辑用户';
  // dialog.width = 660
  // 表单清空
  global.$resetForm(userFromRef.value, dialogModel)
  if (type == EditType.EDIT) {
    dialogModel.id = row.id
    global.$objCopy(row, dialogModel)
  }
  onShow()
  dialogModel.type = type
}
// 暴露给父组件使用
defineExpose({ show })
// 部门数组件弹窗
const { } = useParent()
const parentRef = ref<{ parentShow: () => void }>()
// 是否显示上级树
const handleDeptShow = () => {
  parentRef.value?.parentShow();
}
//  选择上级部门
const select = (selected: ISelectedNode) => {
  dialogModel.deptName = selected.name
  dialogModel.deptId = String(selected.id)
}



</script>
<style scoped lang='scss'>
</style>