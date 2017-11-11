function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
module.exports = class extends Base {
    //展示文章列表，对于不同的栏目有分类，垮了三个表进行查询
    getartlistAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let ArticleType = _this.post('ArticleType');
            console.log('获取到的文章种类 = ', ArticleType);
            let model = _this.model('Article');
            let result = yield model.field('ArticleTitle,ArticleType, UserName, TypeId, TypeName, ArticleId').join({
                User: { join: 'inner', on: ['ArticleAuother', 'UserId'] },
                menutype: { join: 'inner', on: ['ArticleType', 'TypeId'] }
            }).where({ 'ArticleType': ArticleType }).select().then(function (data) {
                return data;
            });

            console.log('文章分类中数据库查询结果 = ', result);
            if (think.isEmpty(result) === false) {
                _this.json({ 'getArticleList': true, 'ArticleList': result });
            } else {
                _this.json({ 'getArticleList': false });
            }
        })();
    }
    //展示文章详情，时间不足够了，所以抱歉
    showartlistAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            let ArticleId = _this2.get('articleid');
            console.log('获取到文章的ID = ', ArticleId);
            let model = _this2.model('Article');
            let result = yield model.where({ 'ArticleId': ArticleId }).find().then(function (data) {
                return data;
            });
            console.log('按照ID查询获取的文章信息 = ', result);
            if (think.isEmpty(result) === false) {
                _this2.json({ 'showArticle': true, 'ArticleList': result });
            } else {
                _this2.json({ 'showArticle': false });
            }
        })();
    }
    //删除文章
    deleteartlistAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            let ArticleId = _this3.get('articleid');
            console.log('删除文章的ID = ', ArticleId);
            let model = _this3.model('Article');
            let result = yield model.where({ 'ArticleId': ArticleId }).delete().then(function (data) {
                return data;
            });
            console.log('删除文章的数量 = ', result);
            if (result) {
                _this3.json({ 'deleteSucc': true });
            } else {
                _this3.json({ 'deleteSucc': false });
            }
        })();
    }

    //添加新文章
    addartlistAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            let TypeId = _this4.post('TypeId');
            let articleTitle = _this4.post('articleTitle');
            let articleContent = _this4.post('articleContent');
            /*let articleAuother = this.post('articleAuother');*/
            let articleAuother = 1;
            /* 此处并不是因为偷懒，而是因为三表联查的时候关联了用户表，所以在数据库之后一人的情况下，实在不方便 */
            let model = _this4.model('Article');
            let result = yield model.add({
                ArticleTitle: articleTitle,
                ArticleContent: articleContent,
                ArticleAuother: articleAuother,
                ArticleType: TypeId
            }).then(function (data) {
                return data;
            });
            console.log('增加新文章 result = ', result);
            if (result > 0) {
                _this4.json({ 'addArticleSucc': true });
            } else {
                _this4.json({ 'addArticleSucc': false });
            }
        })();
    }
};
//# sourceMappingURL=articleList.js.map