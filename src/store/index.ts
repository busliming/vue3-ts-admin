// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import menu, { MenuState } from './module/menu'
import tabs, { TabsState } from './module/tabs'
import user, { UserState } from './module/user'
// import { TabsState } from './module/tabs/state'
import { CommonStore } from './help'
import { ITab } from './types/index'

// export interface State {
//   count: number,
//   collapse: boolean,
//   tabList: Array<ITab>
// }
export const modules = {
  menu,
  tabs,
  user
}

export type RootState = {
  menu: MenuState,
  tabs: TabsState,
  user: UserState
}

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  modules
}) as CommonStore

// 定义自己的 `useStore` 组合式函数
export function useStore(): CommonStore {
  return baseUseStore(key)
}