RR1335 Beginning

这是用 “node”的基础能力，和express、koa2两个框架，分别写了一遍同一个业务。
从而，从原理上理解路由、中间件和框架的实现方法与逻辑。

默认的 / 下是 node 实现的逻辑。
koa 是通过 koa2 实现的逻辑，用 async / await 实现异步处理。
express 是 node 的第一大框架，不过 callback 确实造成了代码的理解与实践的问题。


第一：路由初始化

    将路由和数据处理分开。
    根据 url 的设计，做出路由设计。

第二： 路由

    /api/blog/list             GET    
    /api/blog/detail           GET
    /api/blog/new              POST 
    /api/blog/update           POST
    /api/blog/del              POST
    /api/user/login            POST





拆分路由和控制层

    Controller 核心解决数据处理。
    Router 核心解决路由的事儿，解决路由的事儿。
    在模拟的情况下，假数据在 Controller 层设计。


第三：test目录

    主要是测试一些基本的思路，在这个test目录下有一个Promise的实现。
    通过 Callback 实现的 Promise 的示意，解释 callback 陷阱。


第四： MySQL数据库

    配置 MYSQL ，config/db.js 配置文件。
    配置文件的 production 环境变量需要更新到实际的环境中，有PM2执行的时候的配置。


第五：数据库执行函数

    exec ，src/db 数据库的执行函数。这里的 conn.connect() 为持续连接。
    暂时定义结束执行 end() 通过 mysql 的命令行结束。


第六： 登录状态

    已登录，返回 undefine ；
    未登录，返回 未登录的提示信息。所以，未登录 loginCheck 有 value 返回。

第七：http-server启动web服务器调试

    前端页面，很简单，用于调试使用。
    用 nginx 反向代理实现。


第八：Stream and pipe 读取和写入文件

    Logs的处理，以文件方式处理日志。

第九： 防止SQL注入

    通过 escape 防止 SQL 注入；所有需要input且参与SQL的字段全部要有类似的处理：
    username = escape(username)
    escape() 定义在了 mysql.js 中。

第十： Express

    安装脚手架： npm install express-genretor -g 
    创建项目目录： express expressblog
    初始化和安装依赖： npm intsall 

    替换node，安装nodemon以及环境变量包
    npm install nodemon cross-env --save-dev 


第十一： 设置 package 文件

    设置 dev （开发环境） 
    "scripts": {
         "start": "node ./bin/www",
         //增加环境变量和nodemon的启动
         "dev":"cross-env NODE_ENV=dev nodemon ./bin/www"
     },

第十二：Koa2 的路由说明

    koa2 的路由执行，是从express拷贝过来了，注解并保留了 express 代码，主要是为了对比 express和koa2代码的情况。
    深刻体现 koa2 开发的简洁和顺畅。


第十三： 日志 Morgan

    express and koa2 日志的实现都是 morgan 。
    
