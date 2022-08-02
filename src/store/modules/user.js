import {login,getUserInfoApi,getUserDetail} from '@/api/user'
export default {
  namespaced: true,
  state: {
    token:"",
    userInfo:{}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    async getToken(context, payload) {
      // console.log(payload);
      const res = await login(payload)
      console.log(res)
      context.commit('setToken', res)
    },
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo', {...userBaseInfo, ...userInfo})
    }
  },
}

