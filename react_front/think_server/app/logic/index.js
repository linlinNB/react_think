module.exports = class extends think.Logic {
    _before() {
        console.log('一个请求进来了，经过了_before');
    }

    indexAction() {
        console.log('经过了Logic， 现在在indexAction中做出相对应处理');
    }

    _after() {
        console.log('一个回复发送了，经过了_after');
    }
};
//# sourceMappingURL=index.js.map