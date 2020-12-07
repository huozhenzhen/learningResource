const { HttpException } = require('../core/httpException')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                code: error.code,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.status
        }else{
            console.log(error)
            ctx.body = {
                msg: '服务器内部异常o(*￣▽￣*)o',
                code: 9999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError