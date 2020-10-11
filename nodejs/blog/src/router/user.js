const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const { getValue, setValue } = require('../db/redis')


const handleUserRouter = (req, res) => {
    const method = req.method;

    //登录
    if (method === "POST" && req.path === "/api/user/login") {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                req.session.username = data.username;
                req.session.realname = data.realname;
                setValue(req.sessionId,  req.session)
                return new SuccessModel("登录成功")
            } else {
                return new ErrorModel("登录失败")
            }
        })

    }

    // if (method === "GET" && req.path === "/api/user/login-test") {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }, "登录成功"))
    //     }
    //     return Promise.resolve(new ErrorModel("尚未登录"))
    // }
}

module.exports = handleUserRouter   