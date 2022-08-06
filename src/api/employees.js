import request from '@/utils/request'

export function getEmployeesApi() {
    return request({
        url:'/sys/user/simple'
    })
}



