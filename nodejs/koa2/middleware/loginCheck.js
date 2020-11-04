const { ErrorModel } = require("../model/resModel")

const loginCheck = async (ctx, next) => {
    if (ctx.session.username) {
        await next()
    } else {
        return ctx.body = new ErrorModel("尚未登录")
    }
}

module.exports = loginCheck