import router from './router'
import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'



// 路由（全局）前置守卫
// to
// from
// next
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
const token = store.state.user.token
if(token) {
    // 1.登录
    // 是否进入登录页
    if(to.path === '/login') {
        // 1.1 是  跳到首页
        next('/')
    } else {
        // 1.2 不是  直接进入
        next()
    }
} else {
    // 1.未登录
    // 访问的是否在白名单（未登录也可访问的页面）
    const isCludes = whiteList.includes(to.path)
    if(isCludes) {
    // 2.1 在白名单 放行
        next()
    } else {
        // 2.2 不在白名单（未登录不可访问的页面） 跳到登录页
        next('/login')
    }
}
})