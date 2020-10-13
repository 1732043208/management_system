import {request} from "./request";

export function getHomeLeft() {
    return request({
        url: "menus",
    })
}