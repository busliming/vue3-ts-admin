<template>
  <!-- 搜索区域 -->
  <el-form ref="form" label-width="80px" :inline="true" size="normal">
    <el-form-item label>
      <el-input v-model="searchParams.loginName" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <!-- <el-button :icon="Search" @click="getDeptList">搜索</el-button> -->
      <el-button :icon="Search" @click="searchBtn">搜索</el-button>
      <el-button :icon="Edit" type="primary" @click="addBtn">新增</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格区域 -->
  <el-table
    :data="tableData.data"
    style="width: 100%"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
    v-loading="tableData.loading"
    default-expand-all
    :height="tableHeight"
  >
    <el-table-column prop="loginName" label="姓名" />
    <el-table-column prop="deptName" label="所属部门" />
    <el-table-column prop="mobile" label="电话" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="操作" width="320" align="center">
      <template #default="scope">
        <el-button :icon="Edit" type="primary" size="small">编辑</el-button>
        <el-button :icon="Edit" type="primary" size="small">分配权限</el-button>
        <el-button :icon="Remove" size="small" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang='ts'>
import { Search, Edit, Remove } from '@element-plus/icons'
import useRight from '@/composables/user/useRight';
const { searchParams, tableData, tableHeight, searchBtn, addBtn } = useRight();
</script>
<style scoped lang='scss'>
</style>