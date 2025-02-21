const express = require('express');
const router = express.Router();
const {signin} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function(req, res, next) {
    const { username , password } = req.body
    const result = signin(username,password)

    return result.then(data => {
        if (data.username) {
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('Login error')
        )
    })

});

router.get('/s-test',(req,res,next) => {
    const session = req.session.username
    if (session) {
        res.json({
            errno: 0,
            msg: ' test Success'
        })
        return
    }

    res.json({
        errno: -1,
        msg: 'Login Error'
    })
})




module.exports = router;
