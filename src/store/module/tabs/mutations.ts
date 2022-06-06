import { ITab } from "@/store/types";
import { MutationTree } from "vuex";
import { TabsState } from "./state";

export type TabsMutations = {
  addTabs(state: TabsState, tab: string): void;
}

export const mutations: TabsMutations & MutationTree<TabsState> = {
  addTabs(state: TabsState, tab: string){
    state.tabs.push(tab)
  },
  setTabList(state: TabsState, tabs){
    state.tabs = tabs
  }
}