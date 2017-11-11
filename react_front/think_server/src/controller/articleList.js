const Base = require('./base.js');
module.exports = class extends Base {
    //展示文章列表，对于不同的栏目有分类，垮了三个表进行查询
    async getartlistAction() {
        let ArticleType = this.post('ArticleType');
        console.log('获取到的文章种类 = ', ArticleType);
        let model = this.model('Article');
        let result = await model.field('ArticleTitle,ArticleType, UserName, TypeId, TypeName, ArticleId')
            .join({
                User: {join: 'inner', on: ['ArticleAuother', 'UserId']},
                menutype: {join: 'inner', on: ['ArticleType', 'TypeId']}
            })
            .where({'ArticleType': ArticleType}).select().then(function (data) {
                return data;
            })

        console.log('文章分类中数据库查询结果 = ', result);
        if (think.isEmpty(result) === false) {
            this.json({'getArticleList': true, 'ArticleList': result});
        } else {
            this.json({'getArticleList': false});
        }
    }
    //展示文章详情，时间不足够了，所以抱歉
    async showartlistAction() {
        let ArticleId = this.get('articleid');
        console.log('获取到文章的ID = ', ArticleId);
        let model = this.model('Article');
        let result = await model.where({'ArticleId': ArticleId}).find().then(function (data) {
            return data;
        })
        console.log('按照ID查询获取的文章信息 = ', result);
        if (think.isEmpty(result) === false) {
            this.json({'showArticle': true, 'ArticleList': result});
        } else {
            this.json({'showArticle': false});
        }
    }
    //删除文章
    async deleteartlistAction() {
        let ArticleId = this.get('articleid');
        console.log('删除文章的ID = ', ArticleId);
        let model = this.model('Article');
        let result = await model.where({'ArticleId': ArticleId}).delete().then(function (data) {
            return data;
        })
        console.log('删除文章的数量 = ', result);
        if (result) {
            this.json({'deleteSucc': true});
        } else {
            this.json({'deleteSucc': false});
        }
    }

    //添加新文章
    async addartlistAction() {
        let TypeId = this.post('TypeId');
        let articleTitle = this.post('articleTitle');
        let articleContent = this.post('articleContent');
        /*let articleAuother = this.post('articleAuother');*/
        let articleAuother = 1;
        /* 此处并不是因为偷懒，而是因为三表联查的时候关联了用户表，所以在数据库之后一人的情况下，实在不方便 */
        let model = this.model('Article');
        let result = await model.add({
            ArticleTitle: articleTitle,
            ArticleContent: articleContent,
            ArticleAuother: articleAuother,
            ArticleType: TypeId,
        }).then((data)=>{ return data});
        console.log('增加新文章 result = ', result);
        if (result>0){
            this.json({'addArticleSucc': true});
        } else {
            this.json({'addArticleSucc': false});
        }
    }
}