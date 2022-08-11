import request from "@/utils/request"

export function getRolesApi(params) {
    return request ({
        url: '/sys/role',
        params
    })
}

export function addRoleApi(data) {
    return request ({
        url: '/sys/role',
        method: 'POST',
        data
    })
}

export function removeRoleApi(id) {
    return request ({
        url: `/sys/role/${id}`,
        method: 'DELETE',
    })
}

