<template>
  <el-tabs
    @tab-click="handleTabsEdit"
    v-model="activeTab"
    type="card"
    closable
    class="demo-tabs"
    @edit="handleTabsEdit"
  >
    <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"></el-tab-pane>
  </el-tabs>
</template>
<script setup lang='ts'>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useStore } from '@/store/index';
import { useRoute, useRouter } from 'vue-router';
import { ITab } from '@/store/types';
const route = useRoute();
const router = useRouter();
const store = useStore();
const tabList = computed(() => {
  return store.getters['tabs/getTabList']
  // return store.getters.getTabList
})
const activeTab = ref('')

// 删除tab
const handleTabsEdit = (path: string) => {
  // 当前路由和只有一个tab时候不能删除
  // if (activeTab.value == path || tabList.value.length == 1) return
  // const index = tabList.value.findIndex((item: any) => item.path == path)
  // store.commit('removeTab', index)
  if (path === '/dashboard') return;
  if (activeTab.value === path) {
    tabList.value.forEach((tab: ITab, index: number) => {
      if (tab.path === path) {
        const nextTab = tabList.value[index + 1] || tabList.value[index - 1]
        if (nextTab) {
          activeTab.value = nextTab.path
        }
      }
    })
  }

  activeTab.value = activeTab.value
  const newTabsList = tabList.value.filter((tab: ITab) => tab.path !== path)
  store.commit('tabs/setTabList', newTabsList)
  // store.commit('setTabList', newTabsList)
  console.log(activeTab.value, 'activeTab')
  router.push(activeTab.value)
}
//设置当前选项卡
const setActiveTab = () => {
  activeTab.value = route.path
}
// 设置当前tab数组
const addTabList = () => {
  const { path, meta } = route
  const tab: ITab = { path, title: meta.title as string }
  console.log(tab, 'addTabList')
  store.commit('tabs/setTab', tab)
  // store.commit('setTab', tab)
}
// 解决刷新数据丢失的问题
const beforeunload = () => {
  if (route.path != '/login') {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('tabList', JSON.stringify(tabList.value))

    })
    const sessionStorageTabList = JSON.parse(sessionStorage.getItem('tabList') || '[]')
    store.commit('tabs/setTabList', sessionStorageTabList)
    // store.commit('setTabList', sessionStorageTabList)
  }

}
onMounted(() => {
  beforeunload()
  setActiveTab()
  addTabList();
})
watch(() => route.path, () => {
  console.log('tabs')
  setActiveTab()
  addTabList()
})
</script>
<style scoped lang='scss'>
:deep(.el-tabs__header) {
  margin: 0px;
}
:deep(.el-tabs__item) {
  height: 26px !important;
  line-height: 26px !important;
  text-align: center !important;
  border: 1px solid #d8dce5 !important;
  margin: 0px 3px !important;
  color: #495060;
  font-size: 12px !important;
  padding: 0xp 10px !important;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.is-active) {
  border-bottom: 1px solid transparent !important;
  border: 1px solid #42b983 !important;
  background-color: #42b983 !important;
  color: #fff !important;
}
:deep(.el-tabs__item:hover) {
  color: #495060 !important;
}
:deep(.is-active:hover) {
  color: #fff !important;
}
</style>