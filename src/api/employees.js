import request from '@/utils/request'

export function getEmployeesApi() {
    return request({
        url:'/sys/user/simple'
    })
}


export function getEmployeesInfoApi(params) {
    return request({
        url:'/sys/user',
        params
    })
}


