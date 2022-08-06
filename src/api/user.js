import request from '@/utils/request'


/**
 * 登录请求
 * @param {Object} data password mobile 
 * @returns promise
 */
export function login(data) {
    return request({
        url:'/sys/login',
        method: 'POST',
        data
    })
}


/**
 * 获取用户信息
 * @returns promise
 */
export function getUserInfoApi() {
    return request({
        url:'/sys/profile',
        method: 'POST',
    })
}


/**
 * 
 * @param {String} id 用户id
 * @returns promise
 */
export function getUserDetail(id) {
    return request({
        url:'/sys/user/' + id,
    })
}

export function logout() {
}

/**
 * 删除部门
 * @param {*} id 要删除的部门
 * @returns promise
 */
export function delDeptsApi(id) {
    return request({
        url:'/company/department/' + id,
        method:'DELETE',
    })
}