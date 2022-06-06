<template>
  <sys-dialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template #content>
      <el-form
        :model="addFormModel"
        ref="addMenuFormRef"
        :rules="rules"
        label-width="80px"
        :inline="true"
        size="normal"
      >
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item prop="type" label="菜单类型">
              <el-radio-group v-model="addFormModel.type">
                <el-radio :label="'0'">目录</el-radio>
                <el-radio :label="'1'">菜单</el-radio>
                <el-radio :label="'2'">权限</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="parentName" label="上级菜单" @click="handleClickShow">
              <el-input type="hidden" v-model="addFormModel.parentName"></el-input>
              <el-input readonly  v-model="addFormModel.parentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="label" label="菜单名称">
              <el-input v-model="addFormModel.label"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFormModel.type != '2'">
          <el-col :span="12" :offset="0">
            <el-form-item prop="icon"  label="菜单图标">
              <el-input v-model="addFormModel.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0" v-if="addFormModel.type != '0'">
            <el-form-item prop="name" label="路由名称">
              <el-input v-model="addFormModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFormModel.type == '1'">
          <el-col :span="12" :offset="0">
            <el-form-item prop="path" label="路由地址" >
              <el-input v-model="addFormModel.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="url" label="组件路径">
              <el-input v-model="addFormModel.url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="code" label="权限字段">
              <el-input v-model="addFormModel.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="菜单序号">
              <el-input v-model="addFormModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </sys-dialog>
  <TopParent ref="parentRef" @select="select"></TopParent>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useAddOrEdit from '@/composables/menu/useAddOrEdit';
import useDialog from '@/hooks/useDialog';
import TopParent from './TopParent.vue';
const emit = defineEmits(['saveBtn'])
const { dialog, onShow, onClose } = useDialog()
const { confirm, show,handleClickShow,select, addFormModel,addMenuFormRef,parentRef, rules } = useAddOrEdit(dialog, onShow, onClose,emit)
defineExpose({ show })
</script>
<style scoped lang='scss'>
</style>
