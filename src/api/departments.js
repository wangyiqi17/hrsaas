import request from '@/utils/request'

export function getDeptsApi() {
    return request ({
        url: '/company/department'
    })
}


/**
 * 
 * code 部门编码，同级部门不可重复	
 * introduce 介绍	
 * manager 负责人名称	
 * name 部门名称	
 * pid 父级部门ID
 * 
 * @param {Object} data 
 * @returns promise
 */
export function addDeptApi(data) {
    return request({
        url:'/company/department',
        method: 'POST',
        data
    })
}

export function getDeptByIdApi(id) {
    return request({
        url:'/company/department/' + id,
    })
}


/**
 * 根据id修改部门详情
 * @returns  promise
 */
export function editDeptsApi(data) {
    return request({
        url:'/company/department/' + data.id,
        method: 'PUT',
        data
    })
}