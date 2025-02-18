const { signin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req,res) => {
    const method = req.method    // Get 

    //登录 Login
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        const result = signin(username,password)
        
        return result.then( data => {
            if (data.username) {
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }
}

module.exports = handleUserRouter 