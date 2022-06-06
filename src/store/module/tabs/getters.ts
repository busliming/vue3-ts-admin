import { RootState } from "@/store/index"
import { ITab } from "@/store/types"
import { GetterTree } from "vuex"
import { TabsState } from "./state"

export type TabsGetters = {
  getTabs(state: TabsState): string[];
}

export const getters: TabsGetters & GetterTree<TabsState, RootState> = {
  getTabs(state: TabsState) {
    return state.tabs
  }
}