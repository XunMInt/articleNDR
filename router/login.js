const fs = require('fs');
const path = require('path');
const addtonken = require('../common/addToken');
module.exports = (req, res) => {
    const { username, password } = req.body;
    if (username == '' || password == '' || !username || !password) {
        let result = {data: {},meta: {msg: '参数不能留空',status: '400'}}
        return res.end(JSON.stringify(result));
    }
    let userFs = "../data/user/username/" + username;
    let passFs = "../data/user/password/" + password;
    let userRes;
    let passRes;
    let result = {
        data: {
            username: '',
            token: ''
        },
        meta: {
            msg: '',
            status: ''
        }
    }
    //验证登录
    fs.exists(path.join(__dirname, userFs), async function (exists) {
        userRes = await exists ? true : false;
        fs.exists(path.join(__dirname, passFs), async function (exists) {
            passRes = await exists ? true : false;
            if (userRes && passRes) {
                let token = addtonken.gettoken(username);
                result.data.username = username;
                result.data.token = token;
                result.meta.msg = '登录成功';
                result.meta.status = 200;
            } else {
                result.data.username = username;
                result.data.token = '0';
                result.meta.msg = '用户名或密码错误';
                result.meta.status = 401;
            }
            res.end(JSON.stringify(result));

        });

    });

    
}