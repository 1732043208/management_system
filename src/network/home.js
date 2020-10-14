import {request} from "./request";

export function getHomeLeft() {
    return request({
        url: "menus",
    })
}

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


export function getUsersState(uId, type) {
    return request({
        url: "users/" + uId + "/state/" + type,
        method: "put"
    })
}