const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const { username, password } = req.body
    //登录
    if (method === "POST" && req.path === "/api/user/login") {
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                return new SuccessModel(data, "登录成功")
            } else {
                return new ErrorModel("登录失败")
            }
        })

    }
}

module.exports = handleUserRouter