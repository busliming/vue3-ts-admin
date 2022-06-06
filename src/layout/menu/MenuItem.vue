<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
      <template #title>
        <el-icon>
          <!-- <AddLocation /> -->
          <!-- <component :is="item.meta.icon"></component> -->
          <Icon :icon="item.meta.icon"></Icon>
        </el-icon>
        <span>{{item.meta.title}}</span>
      </template>
      <!-- 递归组件 -->
      <MenuItem :menuList="item.children"></MenuItem>
    </el-sub-menu>
    <el-menu-item v-else :index="item.path" style="color: #f4f4f5">
      <el-icon>
        <!-- <icon-menu /> -->
        <!-- <component :is="item.meta.icon"></component> -->
        <Icon :icon="item.meta.icon"></Icon>
      </el-icon>
      
      <template #title>{{item.meta.title}}</template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
defineProps(['menuList'])

</script>
<style lang="scss" scoped>
</style>