import { ITab } from "@/store/types";

export type TabsState = {
  // tabs: Array<ITab>
  tabs: Array<string>
}

export const state: TabsState = {
  tabs: []
}