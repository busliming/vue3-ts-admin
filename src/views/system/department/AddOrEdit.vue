<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="onConfirm"
  >
    <template #content>
      <el-form
        :model="dialogModel"
        ref="deptRef"
        :rules="rules"
        label-width="80px"
        :inline="true"
        size="normal"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="上级部门" prop="parentName" @click="handleDeptShow">
              <el-input el-input v-model="dialogModel.pid" type="hidden"></el-input>
              <el-input el-input v-model="dialogModel.parentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="部门名称" prop="name">
              <el-input el-input v-model="dialogModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="部门编码">
              <el-input el-input v-model="dialogModel.deptCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="部门电话">
              <el-input el-input v-model="dialogModel.deptPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="部门经理">
              <el-input el-input v-model="dialogModel.manager"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="部门地址">
              <el-input el-input v-model="dialogModel.deptAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="部门序号">
              <el-input el-input v-model="dialogModel.orderNum"></el-input>
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
import useDialog from '@/hooks/useDialog'; // 弹框属性
import useBaseModel from '@/composables/dept/useBaseModel' // 表单基础数据
import SysDialog from '@/components/SysDialog.vue'; //弹框组件
import parent from '@/views/system/department/parent.vue' // 上下级部门组件
import { EditType, Title } from '@/types/BaseEnum'; // 基础枚举类型
import { ref } from 'vue';
import { IAddDeptModel, ISelectedNode } from '@/api/dept/deptModel';
import { ElForm } from 'element-plus';
import useInstance from '@/hooks/useInstance'; // 全局挂载方法

//全局表单清空
const { global, proxy } = useInstance();

// 弹窗属性和方法
const { dialog, onShow, onClose } = useDialog()
// 基础数据
const { dialogModel, rules } = useBaseModel();
// 父组件传给子组件的事件，把子组件的参数给父组件
const emit = defineEmits(['saveBtn'])
// 表单的ref属性
const deptRef = ref<InstanceType<typeof ElForm>>()
// const { proxy } = getCurrentInstance() as any;

// 新增弹窗的确定按钮
const onConfirm = () => {
  console.log(dialogModel, 'dialogModel')
  deptRef.value?.validate(valid => {
    if (valid) {
      emit('saveBtn', dialogModel)
      onClose();
    }
  })
  // proxy.$refs.deptRef.validate((valid: boolean) => {
  //   if (valid) {
  //     emit('saveBtn', dialogModel)
  //     onClose();
  //   } else {

  //   }
  // })

}
// 在组件中，属性和方法，只能对当前的template
// 外部需要使用的时候,需要使用defineExpose 暴露出去
// 父组件调用子组件的方法
const show = (type: string, row: IAddDeptModel) => {
  // 标题显示
  dialog.title = type == EditType.ADD ? Title.ADD : Title.EDIT
  // 表单显示
  onShow();
  // 清空表单
  global.$resetForm(deptRef.value, dialogModel)
  // 编辑时候复制一份到编辑弹窗中
  if(type == EditType.EDIT){
    global.$objCopy(row,dialogModel)
  }
  // 表单是否是新增类型
  dialogModel.type = type
}
defineExpose({ show })

// 处理选择上级部门相关逻辑
const parentRef = ref<{ parentShow: () => void }>();
const handleDeptShow = () => {
  parentRef.value?.parentShow();
}

const select = (selected: ISelectedNode) => {
  dialogModel.parentName = selected.name
  dialogModel.pid = selected.id
}
</script>
<style scoped lang='scss'>
</style>