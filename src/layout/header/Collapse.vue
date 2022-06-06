<template>
  <el-icon class="fa-icon" @click="handleCollapse">
    <component :is="status ? Expand : Fold"></component>
  </el-icon>
</template>
<script setup lang='ts'>
import { computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons'
import { useStore } from '@/store/index';
const store = useStore();
const status = computed(() => {
  return store.getters['menu/getCollapse']
  // return store.getters.getCollapse
})
const handleCollapse = () => {
  store.commit('menu/setCollapse',!status.value)
  // store.commit('setCollapse',!status.value)
}
</script>
<style scoped lang='scss'>
.fa-icon{
  display: flex;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
}
</style>