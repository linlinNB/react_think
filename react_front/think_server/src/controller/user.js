const Base = require('./base.js');
module.exports = class extends Base {
    loginAction(){
        let LoginName = this.post('LoginName');
        let LoginPassword = this.post('LoginPassword');
        console.log('获取到的登录名 = ', LoginName);
        console.log('获取到的密码 = ', LoginPassword);
        let result = this.model('Login').where({'LoginUserName':LoginName,
            "LoginPassWord": LoginPassword}).find();
        console.log('数据库查询结果 = ', result);
        if (think.isEmpty(result)) {
            this.json({'loginsucc': false});
        } else {
            this.json({'loginsucc': true});
        }
    }
}