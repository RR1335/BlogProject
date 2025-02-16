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
