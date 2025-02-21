const crypto = require('node:crypto')

// 定义密钥
const SECRET_KEY = 'djfji87&^*&@jlkj4%^*((dlkjnjdvd'

// MD5 加密
function _md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    const Str = `password=${password}&key=${SECRET_KEY}`
    return _md5(Str)
}


// console.log(genPassword('qe123'))

module.exports = {
    genPassword
}