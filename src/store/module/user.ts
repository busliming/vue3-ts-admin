import { getInfoApi, loginApi } from "@/api/user";
import { ILoginParams, ILoginResult, IUserInfo } from "@/api/user/userModel";
import { IResult } from "@/http/request";
import { getToken, getUserId, setExpireTime, setToken, setUserId } from "@/untils/auth";
import { resolve } from "path/posix";
import { ActionContext } from "vuex";
import { RootState } from "..";

export type UserState = {
  token: string,
  userId: number,
  permissions: Array<string>,
  deptId: number
}

export const state: UserState = {
  token: getToken(),
  userId: getUserId(),
  permissions: [],
  deptId: 1
}

//定义mutations
export const mutations = {
  setToken(state: UserState, token: string) {
    state.token = token;
  },
  setUserId(state: UserState, userId: number) {
    state.userId = userId;
  },
  setRoles(state: UserState, roles: Array<string>) {
    state.permissions = roles;
  },
  setDeptId(state: UserState, deptId: number){
    state.deptId = deptId
  }
}

// //定义actions
export const actions = {
  //用户信息接口
  getInfoAction({commit}: ActionContext<UserState, RootState>){
    return new Promise<IResult<IUserInfo>>((resolve,reject) => {
      getInfoApi().then(res => {
        //权限存储在vuex
        commit('setRoles',res.data.roles || []);
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //登录接口
  loginAction({ commit }: ActionContext<UserState, RootState>, loginModel: ILoginParams){
    return new Promise<IResult<ILoginResult>>((resolve, reject) => {
      loginApi(loginModel).then(res => {
        // 存储token
        if(res.data.code == 200){
          commit('setToken', res.data.token)
          commit('setUserId', res.data.id)
          setToken(res.data.token)
          setUserId(res.data.id)
          setExpireTime(res.data.expireTime)
        }
        console.log(res,'1111')
       return resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
}
// export const actions = {
//   loginAction({ commit }: ActionContext<UserState, RootState>, loginParm: ILoginParams) {
//     return new Promise<ILoginResult>((resolve, reject) => {
//       loginApi(loginParm).then(res => {
//         if (res.data.code == 200) {
//           //设置到vuex中
//           // commit('setToken', res.data.token)
//           // commit('setUserId', res.data.id)
//           //存储到sessionStorage
//           // setToken(res.data.token)
//           // setUserId(res.data.id)
//           // setExpireTime(res.data.expireTime)
//         }
//         resolve(res)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   }
// }

//定义getters
export const getters = {
  getToken(state: UserState) {
    return state.token
  },
  getUserId(state: UserState) {
    return state.userId
  },
  getRoles(state: UserState){
    return state.permissions
  },
  getDeptId(state: UserState){
    return state.deptId
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}