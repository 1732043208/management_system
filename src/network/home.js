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