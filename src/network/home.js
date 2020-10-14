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