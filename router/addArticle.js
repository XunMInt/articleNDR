const fs = require('fs');
const path = require('path');
module.exports = async (req, res) => {
    const { title, article, classify } = req.body;
    if (title == '' || article == '' || classify == '' || !title || !article || !classify) {
        let result = { data: {}, meta: { msg: '参数不能留空', status: '400' } }
        return res.end(JSON.stringify(result));
    }
    let result = {
        data: {
            title: '',
        },
        meta: {
            msg: '',
            status: ''
        }
    }
    let articleFs = "../data/article/" + classify + "/" + title;
    //添加文章
    fs.exists(path.join(__dirname, articleFs), function (exists) {
        if (exists) {
            result.meta.msg = '已存在同标题文章';
            result.meta.status = 400;
            return res.end(JSON.stringify(result));
        }
        fs.writeFile(path.join(__dirname, articleFs), article, function (err) {
            if (err) {
                result.data.title = title;
                result.meta.msg = '添加文章失败';
                result.meta.status = 400;
                res.end(JSON.stringify(result));
                return console.error(err);
            }
            result.data.title = title;
            result.meta.msg = '添加文章成功';
            result.meta.status = 201;
            res.end(JSON.stringify(result));
        });
    })
};
