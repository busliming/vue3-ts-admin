<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item v-for="tab in tabs" :key="tab.path">{{ tab.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang='ts'>
import { computed, ref, watch } from 'vue'
import { RouteLocationMatched, useRoute } from 'vue-router'
const route = useRoute();
const tabs = ref<RouteLocationMatched[]>([])
// const tabs = computed(() => {
//   let matched = route.matched.filter(item => item.meta && item.meta.title)
//   let first = matched[0]
//   if(first && first.path !== '/dashboard'){
//     matched = [{path: '/dashboard', meta: { title: '首页'}} as any].concat(matched)
//   }
//   return matched
// })
const getBreadCrumb = () => {
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  console.log(matched,'matched')
  let first = matched[0]
  if (first && first.path !== '/dashboard') {
    matched = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(matched)
  }
  tabs.value = matched
}
// getBreadCrumb()
watch(() => route.path, () => getBreadCrumb(), {immediate: true})
</script>
<style scoped lang='scss'>
.breadcrumb {
  margin-left: 20px;
}
</style>