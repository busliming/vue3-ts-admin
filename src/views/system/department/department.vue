<template>
  <!-- 搜索区域 -->
  <el-form ref="form" label-width="80px" :inline="true" size="normal" style="margin-top: 20px;">
    <el-form-item label>
      <el-input v-model="searchParams.searchName" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <!-- <el-button :icon="Search" @click="getDeptList">搜索</el-button> -->
      <el-button :icon="Search" @click="searchBtn">搜索</el-button>
      <el-button :icon="Edit" type="primary" @click="addBtn" v-permission="['sys:addDepartment']">新增</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格区域 -->
  <el-table
    :data="tableData.list"
    style="width: 100%"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
    v-loading="loading"
    default-expand-all
    :height="tableHeight"
  >
    <el-table-column prop="name" label="机构名称" />
    <el-table-column prop="deptCode" label="机构编码" />
    <el-table-column prop="deptPhone" label="机构电话" />
    <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <el-button v-permission="['sys:editDept']" :icon="Edit" type="primary" size="small" @click="editBtn(scope.row)">编辑</el-button>
        <el-button v-permission="['sys:deleteDept']" :icon="Remove" size="small" type="danger" @click="deleteBtn(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- lazy
  :load="load"-->
  <AddOrEdit ref="addDeptRef" @saveBtn="saveBtn"></AddOrEdit>
</template>
<script setup lang='ts'>
import { Search, Edit, Remove } from '@element-plus/icons';
import useDeptTable from '@/composables/dept/useDeptTable'
import useDept from '@/composables/dept/useDept';
import AddOrEdit from '@/views/system/department/AddOrEdit.vue'

//表格列表数据
const { searchParams, tableData, loading, tableHeight, getDeptList } = useDeptTable();
//表格操作 搜索 新增 编辑 删除
const { addBtn, editBtn, deleteBtn, saveBtn, searchBtn, addDeptRef } = useDept(getDeptList)

</script>
<style scoped lang='scss'>
</style>