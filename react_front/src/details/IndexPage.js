import React from 'react';
import {Row, Col, Layout, Button} from 'antd';
import {Link} from 'react-router-dom';

//引用子组件
import LoginForm from '../component/LoginForm/show'
import PhotoIcon from '../component/PhotoIcon/PhotoIcon';
import IndexFooter from '../component/Footer/IndexFooter';
//引入滑动组件
import IndexSlider from '../component/Slider/IndexSlide';
//引入分页跳转组件
import ArticleList from '../component/List/ArticleLIst';

const {Header, Content, Footer} = Layout;

let IconStyle = {
    paddingTop: '10px',
}
let FormStyle = {
    marginTop: '-5px',
}

let SliderStyle = {
    width: '800px',
}

class IndexPage extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <Layout>
                <Header>
                    <Row type="flex" align="top" justify="start">
                        <Col push={6} span={1} style={IconStyle}>
                            <PhotoIcon/>
                        </Col>
                        <Col push={12} span={8}>
                            <LoginForm/>
                        </Col>
                    </Row>
                </Header>
                {/* 设置页面主题 */}
                <Content>
                    <Row>
                        <Col push={6} span={13}>
                            <IndexSlider/>
                        </Col>
                    </Row>

                    {/* 设置点击文章切换的地方 */}
                    <div>
                        <ArticleList/>
                    </div>
                    <div>
                        <Row>
                            <Col push={6} span={13}>
                        <Button><Link to="/updatearticle">增加文章</Link></Button>
                            </Col>
                        </Row>
                    </div>
                </Content>
                {/* 设置页脚 */}
                <Footer>
                    <IndexFooter/>
                </Footer>
            </Layout>
        )
    }
}

export default IndexPage;