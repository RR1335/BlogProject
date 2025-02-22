const {  ErrorModel } = require('../model/resModel')

module.exports = async (ctx,next) => {
    if (ctx.session.username) {
        await next()
        return
    }

    ctx.body = new ErrorModel('Not Login')
    // res.json(
    //     new ErrorModel('Not Login')
    // )
}