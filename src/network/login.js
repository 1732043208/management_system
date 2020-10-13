import {request} from "./request";

export function getlogin(username, password) {
    return request({
        url: "login",
        method: 'post',
        data: {
            username,
            password
        }
    })
}