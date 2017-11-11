import {combineReducers} from 'redux';
//表示控制当前登录状态下的信息
import loginReducer from './LogReducer';

const rootReducer = combineReducers({
    loginReducer,
})

//暴露当前总共的Reudcer
export default rootReducer;