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
      <el-table
        :data="roleList.list"
        border
        stripe
        row-key="id"
        v-loading="roleList.loading"
        default-expand-all
        :height="tableHeight"
      >
        <el-table-column prop="id" width="60" align="center" label="选中">
          <template #default="scope">
            <el-radio
              v-model="selectedRoleId"
              :label="scope.row.id"
              size="large"
              @click="handleSelected(scope.row)"
            >{{ "" }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" />
      </el-table>
      <el-pagination
        style="display: flex; justify-content: center;"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="params.currentPage"
        :page-sizes="[10, , 20, 30, 40, 50]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="params.total"
        size="mini"
        background
      ></el-pagination>
    </template>
  </sys-dialog>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAssignRole from '@/composables/user/useAssignRole';
const { dialog, onShow, onClose } = useDialog();
const { confirm, showRole, roleList, params, tableHeight, sizeChange, currentChange, selectedRoleId, handleSelected } = useAssignRole(dialog, onShow, onClose)

defineExpose({ showRole })
</script>
<style scoped lang='scss'>
</style>