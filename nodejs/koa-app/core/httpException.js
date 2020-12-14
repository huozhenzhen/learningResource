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

class Success extends HttpException {
    constructor(data = null, msg = 'ok') {
        super()
        this.status = 200
        this.msg = msg
        this.data = data
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

class AuthFailed extends HttpException {
    constructor(msg = "未授权", code = 10000) {
        super()
        this.code = code
        this.status = 401
        this.msg = msg
    }
}


class Forbbiden extends HttpException {
    constructor(msg = "禁止访问", code = 10000) {
        super()
        this.code = code;
        this.status = 403;
        this.msg = msg
    }
}

class LikeError extends HttpException {
    constructor(msg = "已经点过赞了", code = 10000) {
        super()
        this.code = code;
        this.status = 500;
        this.msg = msg
    }
}

class DislikeError extends HttpException {
    constructor(msg = "已经取消赞了", code = 10000) {
        super()
        this.code = code;
        this.status = 500;
        this.msg = msg
    }
}

module.exports = {
    HttpException,
    NotFoundError,
    ParameterException,
    Success,
    AuthFailed,
    Forbbiden,
    LikeError,
    DislikeError
}