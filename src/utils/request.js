

import store from '@/store'
import axios from 'axios'
import {Message} from 'element-ui'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'

const service = axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

function isTimeOut() {
  const currentTime = Date.now()
    const tokenTime = getTokenTime()
    const timeout = 2 *60 * 60 * 1000
    return currentTime - tokenTime > timeout
}

// 请求拦截器
service.interceptors.request.use(async(config) => {
  // 当前请求的配置
  if(store.state.user.token) {
    // 判断是否有token
    if(isTimeOut()) {
      // 判断token是否过期 过期则跳到登录页
      // console.log('跳到登录页');
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      // token没有过期再携带
    config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
})

// 相应拦截器
service.interceptors.response.use((res) => {
  console.log(res);

  const{success,data,message} = res.data
  if (success) {
  return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
},
async function (error) {
  if(error?.response?.status === 401) {
  Message.error('登录过期')
  await store.dispatch('user/logout')
  router.push('/login')
  }else {
  Message.error(error.message)
  }
  return Promise.reject(error)
}
)
export default service