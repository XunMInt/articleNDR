const fs = require('fs');
const path = require('path');
function deleteFolder(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

module.exports = async (req, res) => {
    const { classify } = req.body;
    if (classify == '' || !classify) {
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
    fs.exists(path.join(__dirname, classifyFs), function (exists) {
        if (!exists) {
            result.data.classify = classify;
            result.meta.msg = '没有该分类';
            result.meta.status = 400;
            return res.end(JSON.stringify(result));
        }
        deleteFolder(path.join(__dirname, classifyFs));
        result.data.classify = classify;
        result.meta.msg = '删除分类成功';
        result.meta.status = 204;
        res.end(JSON.stringify(result));
    })
};