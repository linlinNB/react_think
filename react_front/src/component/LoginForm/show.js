import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {connect} from 'react-redux';
import axios from 'axios';

//导入登录相关的LoginActionCreators
import {go_login, go_logout} from "../../ActionCreator/LoginActionCreator";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        /*console.log('当前登录表单的参数 = ', (this.props.form.getFieldValue('userName')),
            " = = = 密码 = ", (this.props.form.getFieldValue('password')));*/
        this.props.form.validateFields((err, values) => {
            axios.post('/user/login', {
                LoginName: this.props.form.getFieldValue('userName'),
                LoginPassword: this.props.form.getFieldValue('password'),
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200 || response.status === 304) {
                        console.log('回传回来的结果 = ', response.data)
                        //当登录成功之后，我们直接使用更新state中的当前状态
                        if (response.data.loginsucc === true ) {

                            //判断当前的登录状态
                            console.log('当前登录状态是 IsLogined = ', this.props.loginFlag);
                        }
                    } else {
                        console.log('不满足上面结果 = ', response.data)
                    }
                })
                .catch((error) => {
                    console.log('用户登录出现错误，error = ', error);
                })
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        // 进行登录标志位的赋值
        const loginFlag = this.props.loginFlag;
        console.log('render函数中获取的登录状态 = ', loginFlag);
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const go_login = this.props.go_login;
        const go_logout = this.props.go_logout;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                        onClick={go_login}
                    >
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

//关联相关的属性,到底需要state中的那些数据
const mapStateToProps = (state)=>{
    return {loginFlag: state.IsLogined}
}
//关联相关的分发
const actionCreators = {go_login, go_logout}
/*const mapDispatchToProps= (dispatch)=>{
    return {
        setLogin: () => {
            dispatch(go_login())
        },
        setLogout: ()=> {
            dispatch(go_logout())
        }
    }
}*/


let WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
const Change_Wrapped = connect(mapStateToProps, actionCreators)(WrappedHorizontalLoginForm);
export default Change_Wrapped;
