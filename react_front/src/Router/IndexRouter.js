import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

//引入主页
import IndexPage from '../details/IndexPage'
//引入详情页
import ShowArticlePage from '../details/ShowArticlePage'
//引入更新页面
import UpdateArticelePage from '../details/UpdateArtclePage'

const IndexRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={IndexPage}/>
            <Route path="/showarticle" component={ShowArticlePage}/>
            <Route path="/updatearticle" component={UpdateArticelePage}/>
        </Switch>
    </Router>
)

export default IndexRouter;