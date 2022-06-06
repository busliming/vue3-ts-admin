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
      <!-- 分配权限 -->
      <el-tree
        default-expand-all
        :data="assignTreeData.data"
        ref="assignTreeRef"
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="assignTreeData.assignTreeChecked"
        show-checkbox
      />
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAssign from '@/composables/role/useAssign'
const { dialog, onShow, onClose } = useDialog()
// 权限树属性控件相关逻辑
const { roleShow, confirm, defaultProps, assignTreeData, assignTreeRef } = useAssign(dialog, onShow, onClose)
defineExpose({ roleShow })
</script>
<style scoped lang='scss'>
</style>