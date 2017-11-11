import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
//使用react-redux组件
import {Provider} from 'react-redux'
import store from './Store/Store';
//引入登录界面
import IndexPage from './details/IndexPage'
//引入路由
import IndexRoute from './Router/IndexRouter'

ReactDOM.render(<Provider store={store}><IndexRoute/></Provider>,
    document.getElementById('root'));
registerServiceWorker();
