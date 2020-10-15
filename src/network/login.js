import {request} from "./request";

// 登录验证接口
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