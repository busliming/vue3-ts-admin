<template>
  <el-container :style="{ height: containerHeight + 'px' }">
    <el-aside width="210px" style="border-right: 1px solid var(--el-border-color-light)">
      <UserLeftTree @treeClick="treeClick"></UserLeftTree>
    </el-aside>
    <el-main height style="padding-top: 10px; padding-bottom: 0;">
      <el-form ref="form" label-width="80px" :inline="true" size="normal">
        <el-form-item label>
          <el-input v-model="searchParams.loginName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button :icon="Search" @click="getDeptList">搜索</el-button> -->
          <el-button :icon="Search" @click="searchBtn">搜索</el-button>
          <el-button :icon="Close" @click="resetBtn">重置</el-button>
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
            <el-button :icon="Edit" type="primary" size="small" @click="editBtn(scope.row)">编辑</el-button>
            <el-button :icon="Edit" type="primary" size="small" @click="roleBtn(scope.row)">分配角色</el-button>
            <el-button :icon="Remove" size="small" type="danger" @click="deleteBtn(String(scope.row.id))">删除</el-button>
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
        :total="searchParams.total" background>
      </el-pagination>
      
    </el-main>
  </el-container>
  <AddOrEdit ref="addUserRef" @saveBtn="saveBtn"></AddOrEdit>
  <AssignRole ref="assignRoleRef"></AssignRole>
</template>
<script setup lang='ts'>
import { Search, Edit, Remove, Close } from '@element-plus/icons'
import UserLeftTree from './UserLeftTree.vue';
import AddOrEdit from './AddOrEdit.vue';
import useUserTable from '@/composables/user/useUserTable';
import AssignRole from './AssignRole.vue';
const { searchParams, tableData, tableHeight, containerHeight,addUserRef,assignRoleRef, treeClick, searchBtn, addBtn,editBtn,deleteBtn,resetBtn,saveBtn,roleBtn,sizeChange,currentChange } = useUserTable();
</script>
<style scoped lang='scss'>
</style>