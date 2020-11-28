const delFile = require('./delFile');
const md5 = require('md5-node');
const fs = require('fs');
const pa = require('path');

//生产token
function gettoken(val) {
    tokenFs = "../data/token/"
    let pat = pa.join(__dirname, tokenFs)
    delFile.delFile(pat);
    const key1 = '5oiR55yf5biF';
    const key2 = Math.floor(Math.random() * 10000000 + 1);
    let token = md5(md5(key2 + md5(key1 + val + key2) + key2 + key2 + md5(key1 + val + key2) + key2));
    tokenF = pat+token;
    fs.writeFile(tokenF, val,  function(err) {
        if (err) {
            return console.error(err);
        }
     });
     return token;
}

module.exports.gettoken = gettoken;