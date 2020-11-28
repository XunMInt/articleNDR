const path = require('path');
const getList = require('../../common/getList');
const getPage = require('./../../common/getPage');
const fs = require("fs");
module.exports = async (req, res) => {
    const { classify, pagenum, pagesize } = req.query;
    if (classify == '' || !classify || pagenum == '' || !pagenum || pagesize == '' || !pagesize) {
        let result = { data: {}, meta: { msg: '参数不能留空', status: '400' } }
        return res.end(JSON.stringify(result));
    }
    let result = {
        data: {
        },
        meta: {
            msg: '',
            status: ''
        }
    }
    let pathName = "../../data/article/" + classify;
    fs.exists(path.join(__dirname, pathName), function (exists) {
        if (!exists) {
            result.meta.msg = '没有该分类';
            result.meta.status = 400;
            return res.end(JSON.stringify(result));
        }
        
        var filesList = [];
        let articleList = getList.readFileList(path.join(__dirname, pathName), filesList);
        result.data = getPage.getPage(articleList, pagesize, pagenum);
        result.meta.msg = '获取成功';
        result.meta.status = 200;
        res.end(JSON.stringify(result));
    });
}