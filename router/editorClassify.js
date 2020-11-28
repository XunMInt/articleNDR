const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const { classify, newClassify } = req.body;
    if (classify == '' || newClassify == '' || !classify || !newClassify) {
        let result = { data: {}, meta: { msg: '参数不能留空', status: '400' } }
        return res.end(JSON.stringify(result));
    }
    let result = {
        data: {
            classify: ''
        },
        meta: {
            msg: '',
            status: ''
        }
    }
    let classifyFs = "../data/article/" + classify;
    let newClassifyFs = "../data/article/" + newClassify;
    fs.exists(path.join(__dirname, classifyFs), function (exists) {
        if (!exists) {
            result.data.classify = classify;
            result.meta.msg = '没有该分类';
            result.meta.status = 400;
            return res.end(JSON.stringify(result));
        }
        fs.rename(path.join(__dirname, classifyFs), path.join(__dirname, newClassifyFs), function (err) {
            if (err) {
                result.data.classify = classify;
                result.meta.msg = '修改分类失败';
                result.meta.status = 400;
                res.end(JSON.stringify(result));
                return console.error(err);
            } else {
                result.data.classify = newClassify;
                result.meta.msg = '修改分类成功';
                result.meta.status = 200;
                res.end(JSON.stringify(result));
                return console.error(err);
            }
        })
    })
};