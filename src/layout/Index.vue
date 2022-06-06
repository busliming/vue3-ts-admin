<template>
  <el-container class="layout">
    <el-aside width="auto" class="aside">
      <MenuBar></MenuBar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-main class="main">
        <Tabs style="padding: 0 8px;"></Tabs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import Header from '@/layout/header/Header.vue';
import MenuBar from '@/layout/menu/MenuBar.vue'
import Tabs from '@/layout/tab/Tabs.vue';
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  .aside{
    // background-color: var(--el-color-primary-light-1);
    background-color: #304156;
  }
  .header{
    // background-color: var(--el-color-primary-light-7);
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .main{
    // background-color: var(--el-svg-monochrome-grey);
    padding-top: 1px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

</style>