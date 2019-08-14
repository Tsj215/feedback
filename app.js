//加载 http 模块
var http = require('http');
//加载 fs 模块
var fs = require('fs');
//加载 url 模块
var url = require('url');
//加载 模板渲染 模块
var template = require('art-template');


var comments = [

    {
        name: '唐司军',
        message: '又是想你的一天',
        dateTime: '2019-7-5 13:16:10',
    }
];

//获取时间
var mydate = new Date();


//创建http服务
http.createServer(function (req, res) {

    var parseObj = url.parse(req.url, true);

    //获取到客户端请求的路径
    var pathname = parseObj.pathname;

    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                throw err
            } else {

                var htmlStr = template.render(data.toString(), {
                    comments: comments
                });
                res.end(htmlStr)
            }
        })
    } else if (pathname.indexOf('/public/') === 0) {//访问公共资源
        // console.log(pathname);
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                throw err
            } else {
                res.end(data)
            }
        })
    } else if (pathname === '/pinglun') {
        // console.log();
        //获取表单提交的数据
        var comment = parseObj.query;
        //将当前时间加入到表单提交的数据当中
        comment.dateTime = mydate.toLocaleString();
        //将表单提交的数据放到 comments 数组中
        comments.unshift(comment);

        //提交表单数据后对页面进行重定向,设置z状态码为 302
        res.statusCode = 302;
        //设置报文头 location 告诉客户端重定向的页面
        res.setHeader('Location', '/');
        res.end()
    } else if (pathname === '/post') {//访问post页面

        // console.log(parseObj);
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                throw err
            } else {
                res.end(data)
            }
        })
    } else {
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
                throw err
            } else {
                res.end(data)
            }
        })
    }


}).listen(3000, function () {
    console.log('running at port 3000')
});