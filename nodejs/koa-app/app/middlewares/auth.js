const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        Auth.USER = 8
        Auth.ADMIN = 16
        this.level = level || 1
    }
    get m() {
        return async (ctx, next) => {

            const userToken = basicAuth(ctx.req)
            let decode = undefined
            if (!userToken || !userToken.name) {
                throw new global.infos.Forbbiden()
            }
            try {
                const {
                    secretKey,
                } = global.config.security

                decode = jwt.verify(userToken.name, secretKey)
            } catch (error) {
                console.log('error', error)
                if (error.name == 'TokenExpiredError') {
                    throw new global.infos.Forbbiden('token过期')
                } else {
                    throw new global.infos.Forbbiden()
                }
            }
            if (decode.scope < this.level) {
                throw new global.infos.Forbbiden('权限不足')
            }

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next()
        }
    }

    static verifyToken(token) {
        const {
            secretKey,
        } = global.config.security
        try {

            jwt.verify(token, secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = {
    Auth
}