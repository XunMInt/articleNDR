const path = require('path');
const getList = require('../../common/getList');

module.exports = async (req, res) => {

    let result = {
        data: {
            list: ''
        },
        meta: {
            msg: '',
            status: ''
        }
    }
    let pathName = "../../data/article/";

    var filesList = [];
    let calssifyList = getList.readFileList(path.join(__dirname, pathName), filesList);
    result.data.list = calssifyList;
    result.meta.msg = '获取成功';
    result.meta.status = 200;
    res.end(JSON.stringify(result));
}