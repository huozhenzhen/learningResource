const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/token'
})
const {
    LoginType
} = require('@lib/enum')
const {
    User
} = require("@models/user")
const {
    TokenValidator,
    NotEmptyValidator
} = require('@validators/validator')
const {
    generateToken
} = require("@root/core/util")
const {
    Auth
} = require('@middlewares/auth')
const {
    WXManager
} = require('@services/wx')

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    const type = v.get("body.type")
    let token
    switch (type) {
        case LoginType.USER_EMAIL:
            token = await verifyEmail(v.get('body.account'), v.get('body.secert'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'))
            break;
        default:
            break;
    }
    ctx.body = {
        token
    }
})

router.post("/verify", async (ctx) => {
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        is_valide: result
    }
})

async function verifyEmail(email, password) {
    const user = await User.verifyEmailPassword(email, password)
    return generateToken(user.id, Auth.USER)
}


module.exports = router