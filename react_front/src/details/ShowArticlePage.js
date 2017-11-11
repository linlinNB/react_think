import React from 'react';
import axios from 'axios';

class ShowArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: {
                ArticleAuother: 1,
                ArticleContent: "这是首页文章的测试",
                ArticleId: 1,
                ArticleTime: null,
                ArticleTitle: "测试首页",
                ArticleType: 1
            },
            test: []
        }
    }

    componentDidMount() {
        let articleId = window.location.search;
        console.log('获取当前页面的id = ', articleId);
        axios.get(`/articleList/showartlist${articleId}`)
            .then((response)=> {
                if (response.data.showArticle === true){
                    console.log('请求到的数据 = ', response.data.ArticleList);
                    this.setState({
                        articleList: response.data.ArticleList,
                    })
                } else {
                    console.log('没有数据')
                }
            })
            .catch((error)=> {
                console.log('请求错误');
            })
    }

    render() {
        //本来想直接把文章通过props传递过来，但是不符合常识，算了，慢慢来吧
        const ArticleList = this.state.articleList;
        const Title = ArticleList.ArticleTitle;
        const Content = ArticleList.ArticleContent
        return (
            <div>
                <h1>这是默认详情展示</h1>
                <h1>标题：{Title}</h1>
                <p>全文：{Content}</p>
                {/*<h1>{ArticleList}</h1>*/}
            </div>
        )
    }
}

export default ShowArticlePage;