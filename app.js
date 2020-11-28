const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 设置跨域和相应数据格式
app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
  })
  
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//登录
app.post('/login', require('./router/login'));

//验证token
app.use('/admin', require('./common/token'));

//修改密码
app.post('/admin/passwordChange', require('./router/passwordChange'));
//修改用户名
app.post('/admin/userChange', require('./router/userChange'));

//发布文章
app.post('/admin/article', require('./router/addArticle'));
//删除文章
app.post('/admin/delArticle',require('./router/delArticle'));
//修改文章
app.put('/admin/article',require('./router/editorArticle'));

//添加分类
app.post('/admin/classify',require('./router/addclassify'));
//删除分类
app.post('/admin/delClassify',require('./router/delclassify'));
//修改分类
app.put('/admin/classify',require('./router/editorClassify'));

//添加轮播图
app.post('/admin/rotation',require('./router/addRotation'));
//删除轮播图
app.post('/admin/DelRotation',require('./router/delRotation'));


//获取文章列表
app.get('/articleList',require('./router/home/articleList'));
//获取文章内容
app.get('/article',require('./router/home/articlecontent'));

//获取分类列表
app.get('/calssifyList',require('./router/home/classifyList'));

//获取轮播图
app.get('/rotation',require('./router/home/rotation'));

app.listen(8080);
console.log('服务器启动成功！');
