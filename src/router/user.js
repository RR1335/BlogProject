const { signin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

// 设置 Cookie 过期时间
// const getCookieExpires = () => {
//     const d = new Date()
//     d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
//     return d.toGMTString()
// }


// 登录 
const handleUserRouter = (req,res) => {
    const method = req.method    // Get 

    //登录 Login
    if (method === 'POST' && req.path === '/api/user/signin') {
        const {username, password} = req.body
        // 测试 method 改成了 GET， POST - body
        // const {username, password} = req.query
        const result = signin(username,password)
        
        return result.then( data => {
            if (data.username) {

                //设置 session 
                req.session.username = data.username
                req.session.realname = data.realname

                // 同步到 redis 
                set(req.sessionId,req.session)

                // 测试打印
                // console.log('req.session :  ', req.session )

                // 设置 Cookie (app.js)
                // res.setHeader('Set-Cookie',`username=${data.username} ; path = / ; httpOnly; expires = ${getCookieExpires}`)

                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }


    // 登录信息检查 ( 作为登录开发的测试使用 )
    // if (method ==='GET' && req.path === '/api/user/signin-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(
    //             new  SuccessModel({
    //                 // username:req.session.username
    //                 session : req.session 
    //             })
    //         )
    //     }
    //     return Promise.resolve(
    //         new ErrorModel('Not Login')
    //     )
    // }


}






module.exports = handleUserRouter 