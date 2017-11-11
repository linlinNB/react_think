module.exports = class extends think.Logic {
    _before() {
        console.log('user一个请求进来了，经过了_before');
    }

    loginAction() {
        console.log('user经过了Logic， 现在在indexAction中做出相对应处理');
    }

    _after() {
        console.log('user一个回复发送了，经过了_after');
    }
};
//# sourceMappingURL=user.js.map