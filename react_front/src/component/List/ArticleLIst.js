import React from 'react';
import {Pagination, Tabs, Icon, Row, Col, Menu, Table, Button} from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

const TabPane = Tabs.TabPane;

class ArticleLIst extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.getArticleList = this.getArticleList.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            current: '1',
            articleList: [],
        }
    }

    componentDidMount() {
        axios.post('/articleList/getartlist', {
            "ArticleType": 1
        })
            .then((response) => {
                console.log('收到文章列表', response);
                if (response.data.getArticleList === true) {
                    console.log('返回的图书列表 = ', response.data.ArticleList);
                    this.setState({
                        articleList: response.data.ArticleList,
                    })
                }
            })
            .catch((error) => {
                console.log('获取文章列表的时候出现了问题');
            })
    }

    deleteItem(Id) {
        console.log('删除表单元素, Id = ', Id);
        let tempList = [];
        for (let i=0; i< this.state.articleList.length;i++){
            if (this.state.articleList[i].ArticleId !== Id){
                tempList.push(this.state.articleList[i]);
            }
        }

        this.setState({
            articleList: tempList
        })

        //同时删除数据库中的数据
        axios.get(`/articleList/deleteartlist?articleid=${Id}`)
            .then((response)=>{
                if (response.data.deleteSucc === true){
                    console.log('删除成功');
                } else {
                    console.log('删除失败')
                }
            })
            .catch((error)=> {
                console.log('删除的过程中出现了问题， error = ',error);
            })
    }

    render() {
        const articeleList = this.state.articleList;
        //设定表格的处理方式
        const columns = [{
            title: 'ID',
            dataIndex: 'ArticleId',
            key: 'ArticleId',
        }, {
            title: '文章标题',
            dataIndex: 'ArticleTitle',
            key: 'ArticleTitle',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '文章类型',
            dataIndex: 'TypeName',
            key: 'TypeName',
        }, {
            title: '文章作者',
            dataIndex: 'UserName',
            key: 'UserName',
        }, {
            title: '更多操作',
            key: 'TypeAction',
            render: (text, record, dataSource, index) => {
                const Id = record.ArticleId;
                return (
                    <div>
                        <Button onClick={()=>this.deleteItem(Id)}>
                            删除
                        </Button>
                        <ActionButton record={record} dataSource={dataSource}/>
                    </div>
                )
            },
        }];
        return (
            <div>
                <div>
                    <Row>
                        <Col push={6} span={13}>
                            {/* 此处有onChange属性 */}
                            <Menu
                                onClick={this.handleClick}
                                defaultSelectedKeys={[this.state.current]}
                                selectedKeys={[this.state.current]}
                                mode="horizontal"
                            >
                                <Menu.Item key="1">
                                    首页
                                </Menu.Item>
                                {/*<Menu.Item key="2">
                                    科技
                                </Menu.Item>*/}
                                <Menu.Item key="3">
                                    军事
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </div>
                <div>
                    {/* 显示当前的内容 */}
                    <Row>
                        <Col push={6} span={13}>
                            <Table dataSource={articeleList} columns={columns}>
                            </Table>
                        </Col>
                    </Row>
                    {/*{articeleList.map((item, index) => {
                            return (
                                <li key={index}>{item.ArticleTitle}</li>
                            )
                        })}*/}
                </div>
                {/*<div>
                    <Row>
                        <Col push={9} span={13}>
                            <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange}/>
                        </Col>
                    </Row>
                </div>*/}
            </div>
        )
    }

    componentWillUpdate() {

    }

    handleClick(e) {
        console.log('当前点击导航栏按钮 = ', e);
        this.setState({
            current: e.key
        });
        axios.post('/articleList/getartlist', {
            "ArticleType": e.key
        })
            .then((response) => {
                console.log('收到文章列表', response);
                if (response.data.getArticleList === true) {
                    console.log('返回的图书列表 = ', response.data.ArticleList);
                    this.setState({
                        articleList: response.data.ArticleList,
                    })
                }
            })
            .catch((error) => {
                console.log('获取文章列表的时候出现了问题');
            })
    }

    getArticleList(typeNum) {
        console.log('触发了文章导航栏的按钮， 获取文章类型 = ', typeNum);
        axios.post('/articleList/getartlist', {
            "type": typeNum
        })
            .then((response) => {
                console.log('收到文章列表', response);
            })
            .catch((error) => {
                console.log('获取文章列表的时候出现了问题');
            })
    }
}


class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.updateArticle = this.updateArticle.bind(this);
    }

    render() {
        const record = this.props.record;
        const dataSource = this.props.dataSource;
        console.log('dataSource = ', dataSource);
        return (
            <span>
                <Button onClick={this.updateArticle}>
                    <Link to={{pathname: '/showarticle', search: `?articleid=${record.ArticleId}`}}>修改</Link>
                </Button>
                <Button onClick={this.showArticle}>
                    <Link to={{pathname: '/showarticle', search: `?articleid=${record.ArticleId}`}}>查看文章</Link>
                </Button>
            </span>
        )
    }

    /*deleteArticle(record, dataSource) {
        console.log('点击了删除按钮, 删除的Id = ', record.ArticleId)
        dataSource.splice(record.ArticleId, 1);
        this.setState({
            dataSource
        })
    }*/

    updateArticle() {
        console.log('点击了修改文章按钮')
    }

    showArticle() {
        console.log('点击了查看文章按钮')
    }
}


export default ArticleLIst;