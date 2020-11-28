const fs = require('fs');
const path = require('path');
module.exports = async (req, res) => {
    const { rotation } = req.body;
    if (rotation == '' || !rotation) {
        let result = { data: {}, meta: { msg: '参数不能留空', status: '400' } }
        return res.end(JSON.stringify(result));
    }
    let result = {
        data: {
            rotation: '',
        },
        meta: {
            msg: '',
            status: ''
        }
    }
    let rotationFs = "../data/rotation/" + rotation;
    fs.exists(path.join(__dirname, rotationFs), function (exists) {
        if (!exists) {
            result.meta.msg = '轮播图不存在';
            result.meta.status = 400;
            return res.end(JSON.stringify(result));
        }
        fs.unlink(path.join(__dirname, rotationFs), (err) => {
            if (err) {
                result.data.rotation = rotation;
                result.meta.msg = '删除轮播图失败';
                result.meta.status = 400;
                res.end(JSON.stringify(result));
                return console.error(err);
            };
            result.data.rotation = rotation;
            result.meta.msg = '删除轮播图成功';
            result.meta.status = 204;
            res.end(JSON.stringify(result));
        });
    })

};