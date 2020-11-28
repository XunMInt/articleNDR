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
    fs.exists(path.join(__dirname, articleFs), function (exists) {
        if (!exists) {
            result.data.title = title;
            result.meta.msg = '没有该文章';
            result.meta.status = 400;
            return res.end(JSON.stringify(result));
        }
        //修改文章
        fs.writeFile(path.join(__dirname, articleFs), article, function (err) {
            if (err) {
                result.data.title = title;
                result.meta.msg = '修改文章失败';
                result.meta.status = 400;
                res.end(JSON.stringify(result));
                return console.error(err);
            }
            result.data.title = title;
            result.meta.msg = '修改文章成功';
            result.meta.status = 200;
            res.end(JSON.stringify(result));
        });

    })
};