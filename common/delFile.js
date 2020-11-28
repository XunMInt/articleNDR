const fs = require('fs');
//删除文件函数
function delFile(fileUrl,flag){
    if (!fs.existsSync(fileUrl)) return;
    // 当前文件为文件夹时
    if (fs.statSync(fileUrl).isDirectory()) {
        var files = fs.readdirSync(fileUrl);
        var len = files.length,
            removeNumber = 0;
        if (len > 0) {
            files.forEach(function(file) {
                removeNumber ++;
                var stats = fs.statSync(fileUrl+'/'+file);
                var url = fileUrl + '/' + file;
                if (fs.statSync(url).isDirectory()) {
                    delFile(url,true);
                } else {
                    fs.unlinkSync(url);
                }
            });
            if(len == removeNumber && flag){
                fs.rmdirSync(fileUrl);
            }
        } else if(len == 0 && flag){
            fs.rmdirSync(fileUrl);
        }
    } else {
        // 当前文件为文件时
        fs.unlinkSync(fileUrl);
        console.log('删除文件' + fileUrl + '成功');
    }
}

module.exports.delFile = delFile;