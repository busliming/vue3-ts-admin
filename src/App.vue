<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from 'vue';
// import HelloWorld from './components/HelloWorld.vue'
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
// onMounted(() => {
//   store.dispatch('user/getInfoAction')
//   store.dispatch('menu/menuListAction',router)
// })
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <router-view></router-view>
</template>

<style>

</style>
