const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const { getValue, setValue } = require('../db/redis')

const loginCheck = (req) => {
    if(!req.session.username) {
        return Promise.resolve(new ErrorModel("尚未登录"))
    }
}

const handleUserRouter = (req, res) => {
    const method = req.method;
    //登录
    if (method === "POST" && req.path === "/api/user/login") {
        const { username, password } = req.body
        console.log("login", username, password);
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                data.roles =  eval(data.roles)
                req.session = data;
                setValue(req.sessionId,  req.session)
                return new SuccessModel({userId: req.sessionId},"登录成功")
            } else {
                return new ErrorModel("登录失败")
            }
        })

    }

    if (method === "GET" && req.path === "/api/user/info") {
        
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        return Promise.resolve(new SuccessModel(req.session, "获取用户信息成功"))

    
    }
}

module.exports = handleUserRouter   