<template>
  <!-- <img src="../assets/logo.png" alt="logo.png" srcset="logo.png"> -->
  <!-- <img :src="logo" alt="logo"> -->
  <div class="logo" @click="handleCollapse">
    <img :src="logo" alt="logo">
    <div class="title" v-if="!isCollapse">商户后台管理</div>
    <!-- {{props}} -->
  </div>
</template>
<script setup lang="ts">
import logo from '@/assets/logo.png'
const { isCollapse } = defineProps(['isCollapse'])
// console.log(props)
const emit = defineEmits(['handleCollapse'])
const handleCollapse = () => {
  emit('handleCollapse')
}
</script>
<style lang="scss" scoped>
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #2b2f3a;
  border: none;
  img{
    width: 40px;
    height: 40px;
    border: 0 none;
  }
  .title{
    font-size: 24px;
    line-height: 40px;
    font-weight: bold;
    color: white;
    margin-left: 10px;
  }
}
</style>