<template>
  <el-main height>
    <!-- Main content -->
    <el-form ref="form" :inline="true" size="normal">
      <el-form-item>
        <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table
      :data="tableData.list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
      v-loading="tableData.loading"
      default-expand-all
      :height="tableHeight"
    >
      <el-table-column prop="label" label="菜单名称" />
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <el-tag disable-transitions v-if="scope.row.type === '0'">目录</el-tag>
          <el-tag disable-transitions type="success" v-else-if="scope.row.type === '1'">菜单</el-tag>
          <el-tag disable-transitions type="danger" v-else>按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" width="100" label="图标">
        <template #default="scope">
          <Icon v-if="scope.row.icon" style="width: 16px; height: 16px;" :icon="scope.row.icon"></Icon>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="路由名称" />
      <el-table-column prop="path" label="路由地址" />
      <el-table-column prop="url" label="组件路径" />
      <el-table-column prop="code" label="权限字段" />
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button :icon="Edit" type="primary" size="small" @click="editBtn(scope.row)">编辑</el-button>
          <el-button :icon="Delete" size="small" type="danger" @click="deleteBtn(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddOrEditMenu ref="addOrEditRef" @saveBtn="saveBtn"></AddOrEditMenu>
  </el-main>
</template>
<script setup lang='ts'>
import useAction from "@/composables/menu/useAction";
import useMenuTable from "@/composables/menu/useMenuTable";
import AddOrEditMenu from "../Menu/AddOrEditMenu.vue";
import { Plus, Edit, Delete } from "@element-plus/icons"
const { tableData, tableHeight, getMenuList } = useMenuTable()
const { addBtn, editBtn, deleteBtn,saveBtn,addOrEditRef } = useAction(getMenuList);
</script>
<style scoped lang='scss'>
</style>