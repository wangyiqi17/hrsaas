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



export function delEmployee(id) {
    return request({
        url:`/sys/user/${id}`,
        method: 'DELETE',
    })
}

// 读取用户详情的基础信息
export function getPersonalDetail(id) {
    return request({
        url:`/employees/${id}/personalInfo`,
    })
}



// 更新用户详情的基础信息
export function updatePersonal(data) {
    return request({
        url:`/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}



/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}


export function importEmployees(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}


export function assignRoles(data) {
  return request({
    method: 'put',
    url: '/sys/user/assignRoles',
    data
  })
}