RR1335 Beginning

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
