import { ITab } from "../types"
export type TabsState = {
  tabList: Array<ITab>
}

// 定义state
export const state: TabsState = {
  tabList: []
}

export const mutations = {
  setTabList(state: TabsState, tabList: Array<ITab>){
    state.tabList = tabList
  },
  setTab(state: TabsState, tab: ITab) {
    if (state.tabList.some(item => item.path == tab.path)) return;
    state.tabList.push(tab)
  },
}

export const getters = {
  getTabList(state: TabsState) {
    return state.tabList
  }
}

export const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

