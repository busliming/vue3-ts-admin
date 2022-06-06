<template>
  <el-main height style="padding-top: 10px; padding-bottom: 0;">
    <!-- Main content -->
    <el-form label-width="80px" :inline="true" size="normal">
      <el-form-item label>
        <el-input v-model="searchParams.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="Close" type="danger" plain @click="resetBtn">重置</el-button>
        <el-button :icon="Plus" type="primary" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table
      :data="tableData.list"
      style="width: 100%"
      row-key="id"
      border
      v-loading="tableData.loading"
      :height="tableHeight"
    >
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="remark" label="备注信息" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="320" align="center">
        <template #default="scope">
          <el-button :icon="Edit" type="primary" size="small" @click="editBtn(scope.row)">编辑</el-button>
          <el-button
            :icon="AddLocation"
            type="primary"
            size="small"
            @click="roleBtn(scope.row)"
          >分配权限</el-button>
          <el-button :icon="Remove" size="small" type="danger" @click="deleteBtn(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="display: flex; justify-content: center;"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="searchParams.currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="searchParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchParams.total"
      background
    ></el-pagination>
  </el-main>
  <AddOrEdit ref="addRoleRef" @saveBtn="saveBtn"></AddOrEdit>
  <Assign ref="assignRef"></Assign>
</template>
<script setup lang='ts'>
import { Search, Close, AddLocation, Plus, Edit, Remove } from '@element-plus/icons'
import useRoleTable from '@/composables/role/useRoleTable';
import useTable from '@/composables/role/useTable'
import AddOrEdit from './AddOrEdit.vue';
import Assign from './Assign.vue';
const { searchParams, tableData, tableHeight, getRoleList, sizeChange, currentChange } = useRoleTable()
const { addRoleRef, assignRef, addBtn, searchBtn, saveBtn, resetBtn, editBtn, deleteBtn, roleBtn } = useTable(searchParams, getRoleList)
</script>
<style scoped lang='scss'>
</style>