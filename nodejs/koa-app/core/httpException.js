class HttpException extends Error {
    constructor(msg = '出错了', code = 10000, status = 400) {
        super()
        this.code = code
        this.status = status
        this.msg = msg
    }
}

class NotFoundError extends HttpException {
    constructor(msg = '资源未找到', code = 10000) {
        super() 
        this.code = code
        this.status = 404
        this.msg = msg
    }
}

class ParameterException extends HttpException {
    constructor(msg = '参数错误', code = 10000) {
        super()
        this.code = code
        this.status = 400
        this.msg = msg
    }
}


module.exports = {
    HttpException,
    NotFoundError,
    ParameterException
}
