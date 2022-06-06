// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { TabsState } from './module/tabs/state'
import { ITab } from './types/index'

export interface State {
  count: number,
  collapse: boolean,
  tabList: Array<ITab>
}


export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    collapse: false,
    tabList: []
  },
  mutations: {
    setCount(state: State, count: number) {
      state.count = count
    },
    setCollapse(state: State, collapse: boolean) {
      state.collapse = collapse
    },
    setTab(state: State, tab: ITab) {
      if (state.tabList.some(item => item.path == tab.path)) return;
      state.tabList.push(tab)
    },
    removeTab(state:State, index: number){
      state.tabList.splice(index,1)
    },
    setTabList(state: State, tabList: Array<ITab>){
      state.tabList = tabList
    }
  },
  getters: {
    getCount(state: State) {
      return state.count
    },
    getCollapse: (state: State) => {
      return state.collapse
    },
    getTabList(state: State) {
      return state.tabList
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}