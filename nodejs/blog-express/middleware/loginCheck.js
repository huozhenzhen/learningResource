const { ErrorModel } = require("../model/resModel")

const loginCheck = (req, res, next) => {
    if (req.session.username) {
        next()
    } else {
        return res.json(new ErrorModel("尚未登录"))
    }
}

module.exports = loginCheck