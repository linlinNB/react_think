import * as LoginActionTypes from '../ActionTypes/loginActionTypes';


let initState = {
    IsLogined: false
}

const loginReducer = function LoginReducer(state=initState, action) {
    switch (action.type){
        case LoginActionTypes.LOGIN:
            console.log('获取到了Reducer中的登陆事件')
            return Object.assign({}, state, {IsLogined: true})
        case LoginActionTypes.LOGOUT:
            return Object.assign({}, state, {IsLogined: false})
        default:
            return state;
    }
}

export default loginReducer;