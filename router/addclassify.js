const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const { classify } = req.body;
    if (classify == '' || !classify) {
        let result = { data: {}, meta: { msg: '参数不能留空', status: '400' } }
        return res.end(JSON.stringify(result));
    }
    let result = {
        data: {
            classify:''
        },
        meta: {
            msg: '',
            status: ''
        }
    }
    let classifyFs = "../data/article/" + classify;
    //添加分类
    fs.exists(path.join(__dirname, classifyFs), function (exists) {
        if (exists) {
            result.meta.msg = '分类已存在';
            result.meta.status = 400;
            return res.end(JSON.stringify(result));
        }
        fs.mkdir(path.join(__dirname, classifyFs), function (err) {
            if (err) {
                result.data.classify = classify;
                result.meta.msg = '添加分类失败';
                result.meta.status = 400;
                res.end(JSON.stringify(result));
                return console.error(err);
            } else {
                result.data.classify = classify;
                result.meta.msg = '添加分类成功';
                result.meta.status = 201;
                res.end(JSON.stringify(result));
            }
        });
    })
};