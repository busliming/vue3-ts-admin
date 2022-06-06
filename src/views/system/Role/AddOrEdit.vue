<template>
  <sys-dialog
    :visible="dialog.visible"
    :width="dialog.width"
    :height="dialog.height"
    :title="dialog.title"
    @onConfirm="confirm"
    @onClose="onClose"
  >
    <template #content>
      <el-form
        :model="roleModel"
        ref="roleFormRef"
        :rules="rules"
        label-width="80px"
        :inline="true"
        size="normal"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="roleModel.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="备注信息">
              <el-input v-model="roleModel.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </sys-dialog>
</template>
<script setup lang='ts'>
import { addRoleApi,editRoleApi } from '@/api/role';
import SysDialog from '@/components/SysDialog.vue';
import useBaseRole from '@/composables/role/useBaseRole';
import useDialog from '@/hooks/useDialog';
import useInstance from '@/hooks/useInstance';
import { EditType } from '@/types/BaseEnum';
import { getUserId } from '@/untils/auth';
import { ElForm, ElMessage } from 'element-plus';
import { ref } from 'vue';
const { dialog, onClose, onShow } = useDialog()
const { roleModel, rules } = useBaseRole()
const roleFormRef = ref<InstanceType<typeof ElForm>>()
const { global } = useInstance()
const emit = defineEmits(['saveBtn'])
const confirm = () => {
  roleFormRef.value?.validate(async (valid) => {
    if (valid) {
       let res
      if(roleModel.type == EditType.ADD){
        roleModel.createUser = getUserId();
        res = await addRoleApi(roleModel)
      }else{
        res = await editRoleApi(roleModel)
      }
      if (res && res.code == 200) {
        emit('saveBtn');
        ElMessage.success(res.msg)
        onClose()
      }
    }
  })

}
const show = (type: string,row: any) => {
  console.log(type,roleModel,'type')
  dialog.title = type == EditType.ADD ? '新增角色' : '编辑角色'
  dialog.height = 50
  global.$resetForm(roleFormRef.value,roleModel);
  if(type == EditType.EDIT){
    roleModel.id = row.id
    console.log(roleModel,'roleModel')
    global.$objCopy(row,roleModel)
  }
  onShow()
  roleModel.type = type
}
defineExpose({ show })
</script>
<style scoped lang='scss'>
</style>