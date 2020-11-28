const path = require('path');
const fs = require("fs");
module.exports = async (req, res) => {
    const { classify, article } = req.query;
    if (classify == '' || !classify || article == '' || !article) {
        let result = { data: {}, meta: { msg: '参数不能留空', status: '400' } }
        return res.end(JSON.stringify(result));
    }
    let result = {
        data: {
            content:''
        },
        meta: {
            msg: '',
            status: ''
        }
    }

    let pathName = "../../data/article/" + classify + "/" + article;

    fs.exists(path.join(__dirname, pathName), function (exists) {
        if (!exists) {
            result.meta.msg = '没有该文章';
            result.meta.status = 400;
            return res.end(JSON.stringify(result));
        }
        let content = fs.readFileSync(path.join(__dirname, pathName), "utf-8");
        result.data.content = content;
        result.meta.msg = '获取成功';
        result.meta.status = 200;
        res.end(JSON.stringify(result));
    });


}