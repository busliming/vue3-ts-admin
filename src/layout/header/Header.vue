<template>
    <div class="header">
      <!-- 折叠icon -->
      <Collapse></Collapse>
      <!-- 面包屑导航 -->
      <BreadCrumb></BreadCrumb>
    </div>
    <!-- 用户信息 -->
    <UserInfo></UserInfo>
</template>
<script setup lang="ts">
import Collapse from './Collapse.vue';
import BreadCrumb from './BreadCrumb.vue';
import UserInfo from '@/layout/header/UserInfo.vue'
</script>
<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>