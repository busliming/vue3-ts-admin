import { menuListApi } from "@/api/menu"
import { RouteRecordRaw } from "vue-router"
import { ActionContext } from "vuex"
import { RootState } from ".."
import Layout from '@/layout/Index.vue'
const modules: any = import.meta.glob('../../views/**/*.vue')

console.log(modules, 'modules')
export type MenuState = {
  count: number,
  collapse: boolean,
  menuList: any
}

export const state: MenuState = {
  count: 0,
  collapse: false,
  menuList: [
    {
      path: '/dashboard',
      component: "Layout",
      meta: {
        title: "首页",
        icon: "House",
        roles: ["sys:manage"]
      },
      children: []
    },
  ]
}

export const getters = {
  getCount(state: MenuState) {
    return state.count
  },
  getCollapse: (state: MenuState) => {
    return state.collapse
  },
  getMenuList: (state: MenuState) => {
    return state.menuList
  },
}

export const mutations = {
  setCount(state: MenuState, count: number) {
    state.count = count
  },
  setCollapse(state: MenuState, collapse: boolean) {
    state.collapse = collapse
  },
  setMenuList(state: MenuState, menuList: Array<RouteRecordRaw>) {
    state.menuList = state.menuList.concat(menuList)
  },
}

export const actions = {
  menuListAction({ commit }: ActionContext<MenuState, RootState>, router: any) {
    return new Promise((resolve, reject) => {
      menuListApi().then(res => {
        let accessedRoutes;
        if (res.code == 200) {
          accessedRoutes = filterAsyncRoutes(res.data, router)
          commit('setMenuList', accessedRoutes)
        }
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export const filterAsyncRoutes = (routes: RouteRecordRaw[], router: any) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route:any) => {
    const temp = { ...route};
    const component = temp.component;
    if (route.component) {
      if (component == 'Layout') {
        temp.component = Layout
      } else {
        temp.component = modules[`../../views${component}.vue`]
      }
    }
    console.log(temp,'temp')
    if (temp.children) {
      temp.children = filterAsyncRoutes(temp.children, router)
    }
    // 增加动态路由
    router.addRoute(temp)
    res.push(temp)
  })
  console.log(res,'routes')
  return res;
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}