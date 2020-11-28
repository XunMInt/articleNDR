const path = require('path');
const getList = require('../../common/getList');
const fs = require("fs");

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
    let pathName = "../../data/rotation/";
    var filesList = [];
    let rotationList = getList.readFileList(path.join(__dirname, pathName), filesList);
    let urlList = [];
    for (let i = 0; i < rotationList.length; i++) {
        console.log(rotationList[i]);
        let pathName = "../../data/rotation/" + rotationList[i];
        let content = fs.readFileSync(path.join(__dirname, pathName), "utf-8");
        urlList.push({ rotation: rotationList[i], img: content })
    }
    result.data.list = urlList;
    result.meta.msg = '获取成功';
    result.meta.status = 200;
    res.end(JSON.stringify(result));
}