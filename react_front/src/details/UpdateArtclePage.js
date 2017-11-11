import React from 'react';
import {Form, Input, Button, Radio} from 'antd';
import axios from 'axios';

const {TextArea} = Input;
const RadioGroup = Radio.Group;



class UpdateArtclePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            TypeId: 1,
            articleTitle: '默认标题',
            articleContent: '默认文章',
            articleAuother: '默认作者'

        }
        this.submitnewArticle = this.submitnewArticle.bind(this);

    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            TypeId: e.target.value,
        });
    }
    // 点击发布，进行发布新文章
    submitnewArticle() {
        axios.post('/articleList/addartlist', {
            TypeId: this.state.TypeId,
            articleTitle: this.state.articleTitle,
            articleContent: this.state.articleContent,
            articleAuother: this.state.articleAuother,
        })
            .then((response)=> {
                if (response.data.addArticleSucc === true){
                    console.log('发布成功');
                    //    进行页面转跳
                    this.props.history.push('/');
                } else {
                    console.log('发布失败');
                    alert('发布失败，请检查各种各样无聊的情况');
                }
            })
            .catch((error)=> {
                console.log('发布文章发生了错误，error = ',error);
            })
    }
    //绑定题目
    onChangeTitle = (e)=> {
        this.setState({
            articleTitle: e.target.value
        })
    }
    //绑定内容
    onChangeContent = (e)=> {
        this.setState({
            articleContent: e.target.value
        })
    }
    //绑定作者
    onChangeAuother = (e)=>{
        this.setState({
            articleAuother: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div>
                    <span>标题</span>
                    <input placeholder="请输入文章标题" onChange={this.onChangeTitle}/>
                </div>
                <div>
                    <span>作者</span>
                    <input placeholder="请输入作者" onChange={this.onChangeAuother}/>
                </div>
                <div>
                    <span>文章内容</span>
                    <TextArea rows={4} onChange={this.onChangeContent}/>
                </div>
                <div>
                    <span>分类</span>
                    <RadioGroup onChange={this.onChange} value={this.state.TypeId}>
                        <Radio value={1}>首页</Radio>
                        <Radio value={3}>军事</Radio>
                    </RadioGroup>
                </div>
                <div>
                    <Button onClick={this.submitnewArticle}>发布</Button>
                </div>
            </div>
        )
    }
}

export default UpdateArtclePage;