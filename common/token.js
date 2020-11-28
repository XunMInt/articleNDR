const fs = require('fs');
const path = require('path');
module.exports = (req, res, next) => {
    let result = {
        data: {
        },
        meta: {
            msg: '',
            status: ''
        }
    }
    let tokenFs = "../data/token/" + req.headers.authorization;
    fs.exists(path.join(__dirname, tokenFs), async function (exists) {
        if (exists) {
            next();
        } else {
            result.meta.msg = '无效token';
            result.meta.status = 403;
            res.end(JSON.stringify(result));
        }
    });
}