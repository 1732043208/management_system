import {request} from "./request";

// 左侧菜单权限
export function getHomeLeft() {
    return request({
        url: "menus",
    })
}

// 用户数据列表
export function getUsers(query, pagenum, pagesize) {
    return request({
        url: "users",
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}

// 添加用户
export function getAddUsers(username, password, email, mobile) {
    return request({
        url: "users",
        method: 'post',
        data: {
            username,
            password,
            email,
            mobile
        }
    })
}

// 修改用户状态
export function getUsersState(uId, type) {
    return request({
        url: "users/" + uId + "/state/" + type,
        method: "put"
    })
}

// 根据 ID 查询用户信息
export function getSearchUsers(id) {
    return request({
        url: "users/" + id,
    })
}

// 编辑用户提交
export function getEditUsers(id, email, mobile) {
    return request({
        url: "users/" + id,
        method: 'put',
        data: {
            email,
            mobile
        }
    })
}

export function getDeleteUsers(id) {
    return request({
        url: "users/" + id,
        method: 'delete'
    })
}

// 所有权限列表
export function getAllPowerLists(type) {
    return request({
        url: "rights/" + type
    })
}

// 角色列表
export function getRolesList() {
    return request({
        url: "roles"
    })
}

// 添加角色
export function getAddRoles(roleName, roleDesc) {
    return request({
        url: "roles",
        method: 'post',
        data: {
            roleName,
            roleDesc
        }
    })
}

//根据 ID 查询用户信息
export function getRolesID(id) {
    return request({
        url: "roles/" + id
    })
}

// 编辑提交角色
export function getChangeRoles(id, roleName, roleDesc) {
    return request({
            url: 'roles/' + id,
            method: 'put',
            data: {
                roleName,
                roleDesc
            }
        }
    )
}

// 删除角色
export function getDeleteRoles(id) {
    return request({
        url: "roles/" + id,
        method: 'delete'
    })
}

export function getDeleteRolesPower(roleId, rightId) {
    return request({
        url: "roles/" + roleId + "/rights/" + rightId,
        method: 'delete'
    })
}