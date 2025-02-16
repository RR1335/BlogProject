const handleUserRouter = (req,res) => {
    const method = req.method 
    // const url = req.url
    // const path = url.split('?')[0]

    //登录 Login
    if (method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: '登录成功 login'
        }
    }

}

module.exports = handleUserRouter 