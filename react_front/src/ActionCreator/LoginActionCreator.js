import * as LoginActionTypes from '../ActionTypes/loginActionTypes';

export function go_login() {
    console.log('触发了ActionCreator中的登录事件')
    return {
        type: LoginActionTypes.LOGIN,
    }
}

export function go_logout() {
    return {
        type: LoginActionTypes.LOGOUT,
    }
}