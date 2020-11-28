const fs = require('fs');
const path = require('path');
const delFile = require('../common/delFile');
const addtonken = require('../common/addToken');
module.exports = async (req, res) => {
    const { username, password, newPassword } = req.body;
    if (username == '' || password == '' || newPassword == '' || !username || !password || !newPassword) {
        let result = {data: {},meta: {msg: '参数不能留空',status: '400'}}
        return res.end(JSON.stringify(result));
    }else if(newPassword.length<5){
        let result = {data: {},meta: {msg: '密码不得小于5位',status: '400'}}
        return res.end(JSON.stringify(result));
    }
    let userFs = "../data/user/username/" + username;
    let passFs = "../data/user/password/" + password;
    let newPassFs = "../data/user/password/" + newPassword;
    let userRes;
    let passRes;
    let result = {
        data: {
            username: '',
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
                delFile.delFile(path.join(__dirname, passFs));
                fs.writeFile(path.join(__dirname, newPassFs), newPassword, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
                addtonken.gettoken(username);
                result.data.username = username;
                result.meta.msg = '修改密码成功';
                result.meta.status = 200;
            } else {
                result.data.username = username;
                result.meta.msg = '旧密码错误';
                result.meta.status = 401;
            }
            res.end(JSON.stringify(result));
        });
    });

};
